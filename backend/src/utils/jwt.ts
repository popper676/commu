import jwt from 'jsonwebtoken';

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

export interface TokenPayload {
    id: string;
    email: string;
    username: string;
}

/**
 * Generate access token (short-lived)
 */
export const generateAccessToken = (payload: TokenPayload): string => {
    return jwt.sign(payload as any, JWT_ACCESS_SECRET, {
        expiresIn: JWT_ACCESS_EXPIRES_IN,
    });
};

/**
 * Generate refresh token (long-lived)
 */
export const generateRefreshToken = (payload: TokenPayload): string => {
    return jwt.sign(payload as any, JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRES_IN,
    });
};

/**
 * Verify access token
 */
export const verifyAccessToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, JWT_ACCESS_SECRET) as TokenPayload;
    } catch (error) {
        return null;
    }
};

/**
 * Verify refresh token
 */
export const verifyRefreshToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
    } catch (error) {
        return null;
    }
};

/**
 * Generate token pair
 */
export const generateTokenPair = (payload: TokenPayload) => {
    return {
        accessToken: generateAccessToken(payload),
        refreshToken: generateRefreshToken(payload),
    };
};
