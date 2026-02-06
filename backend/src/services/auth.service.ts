import bcrypt from 'bcrypt';
import prisma from '../config/database';
import { ApiError, HttpStatus } from '../utils/response';
import { generateTokenPair, verifyRefreshToken } from '../utils/jwt';
import { RegisterDto, LoginDto } from '../validators/auth.validator';

export class AuthService {
    /**
     * Register a new user
     */
    async register(data: RegisterDto) {
        // Check if user exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email: data.email }, { username: data.username }],
            },
        });

        if (existingUser) {
            if (existingUser.email === data.email) {
                throw new ApiError(HttpStatus.CONFLICT, 'Email already registered');
            }
            throw new ApiError(HttpStatus.CONFLICT, 'Username already taken');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(data.password, 12);

        // Create user
        const user = await prisma.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: hashedPassword,
                fullName: data.fullName,
            },
            select: {
                id: true,
                username: true,
                email: true,
                fullName: true,
                avatar: true,
                createdAt: true,
            },
        });

        // Generate tokens
        const tokens = generateTokenPair({
            id: user.id,
            email: user.email,
            username: user.username,
        });

        // Save refresh token
        await this.saveRefreshToken(user.id, tokens.refreshToken);

        return { user, tokens };
    }

    /**
     * Login user
     */
    async login(data: LoginDto) {
        // Find user
        const user = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (!user) {
            throw new ApiError(HttpStatus.UNAUTHORIZED, 'Invalid email or password');
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(data.password, user.password);

        if (!isValidPassword) {
            throw new ApiError(HttpStatus.UNAUTHORIZED, 'Invalid email or password');
        }

        // Generate tokens
        const tokens = generateTokenPair({
            id: user.id,
            email: user.email,
            username: user.username,
        });

        // Save refresh token
        await this.saveRefreshToken(user.id, tokens.refreshToken);

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;

        return { user: userWithoutPassword, tokens };
    }

    /**
     * Refresh access token
     */
    async refresh(refreshToken: string) {
        // Verify token structure
        const decoded = verifyRefreshToken(refreshToken);

        if (!decoded) {
            throw new ApiError(HttpStatus.UNAUTHORIZED, 'Invalid refresh token');
        }

        // Check if token exists in DB
        const savedToken = await prisma.refreshToken.findUnique({
            where: { token: refreshToken },
        });

        if (!savedToken) {
            // Token reuse detected! Potential theft.
            // In a strict system, we might invalidate all user tokens here.
            throw new ApiError(HttpStatus.UNAUTHORIZED, 'Invalid refresh token');
        }

        // Check expiry
        if (new Date() > savedToken.expiresAt) {
            await prisma.refreshToken.delete({ where: { token: refreshToken } });
            throw new ApiError(HttpStatus.UNAUTHORIZED, 'RefreshToken expired');
        }

        // Generate new tokens
        const tokens = generateTokenPair({
            id: decoded.id,
            email: decoded.email,
            username: decoded.username,
        });

        // Rotate refresh token (delete old, save new)
        await prisma.$transaction([
            prisma.refreshToken.delete({ where: { token: refreshToken } }),
            this.createRefreshTokenRecord(decoded.id, tokens.refreshToken),
        ]);

        return tokens;
    }

    /**
     * Logout (invalidate refresh token)
     */
    async logout(refreshToken: string) {
        if (!refreshToken) return;

        await prisma.refreshToken.deleteMany({
            where: { token: refreshToken },
        });
    }

    /**
     * Get current user profile
     */
    async getMe(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                username: true,
                fullName: true,
                fullNameMm: true,
                avatar: true,
                bio: true,
                bioMm: true,
                phone: true,
                verified: true,
                createdAt: true,
            },
        });

        if (!user) {
            throw new ApiError(HttpStatus.NOT_FOUND, 'User not found');
        }

        return user;
    }

    // Helper: Save refresh token to DB
    private async saveRefreshToken(userId: string, token: string) {
        // 7 days expiry
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        await prisma.refreshToken.create({
            data: {
                token,
                userId,
                expiresAt,
            },
        });
    }

    // Helper: Create Prisma promise for transaction
    private createRefreshTokenRecord(userId: string, token: string) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);

        return prisma.refreshToken.create({
            data: {
                token,
                userId,
                expiresAt,
            },
        });
    }
}

export default new AuthService();
