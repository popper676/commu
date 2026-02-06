import { Request, Response, NextFunction } from 'express';
import { ApiError, HttpStatus } from '../utils/response';
import { verifyAccessToken, TokenPayload } from '../utils/jwt';
import prisma from '../config/database';

// Extend Express Request type to include user
declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload;
        }
    }
}

/**
 * Authentication middleware
 * Verifies the access token from the Authorization header
 */
export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new ApiError(HttpStatus.UNAUTHORIZED, 'Authentication required');
        }

        const token = authHeader.split(' ')[1];
        const decoded = verifyAccessToken(token);

        if (!decoded) {
            throw new ApiError(HttpStatus.UNAUTHORIZED, 'Invalid or expired token');
        }

        // Optional: Check if user still exists and hasn't changed password recently
        // const user = await prisma.user.findUnique({ where: { id: decoded.id } });
        // if (!user) throw new ApiError(HttpStatus.UNAUTHORIZED, 'User not found');

        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};

/**
 * Optional authentication middleware
 * Does not throw error if no token, just leaves req.user undefined
 */
export const authenticateOptional = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const decoded = verifyAccessToken(token);

            if (decoded) {
                req.user = decoded;
            }
        }

        next();
    } catch (error) {
        // Ignore errors for optional auth
        next();
    }
};
