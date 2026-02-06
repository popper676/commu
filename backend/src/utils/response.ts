import { Request, Response, NextFunction } from 'express';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(statusCode: number, message: string, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Async handler wrapper to catch errors in async route handlers
 */
export const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

/**
 * HTTP status code helpers
 */
export const HttpStatus = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
};

/**
 * Success response helper
 */
export const successResponse = (
    res: Response,
    data: any,
    message = 'Success',
    statusCode = HttpStatus.OK
) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

/**
 * Error response helper
 */
export const errorResponse = (
    res: Response,
    message: string,
    statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
    errors?: any
) => {
    return res.status(statusCode).json({
        success: false,
        message,
        ...(errors && { errors }),
    });
};

/**
 * Pagination helper
 */
export interface PaginationParams {
    page: number;
    limit: number;
    skip: number;
}

export const getPaginationParams = (req: Request): PaginationParams => {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));
    const skip = (page - 1) * limit;

    return { page, limit, skip };
};

export const paginatedResponse = (
    res: Response,
    data: any[],
    total: number,
    page: number,
    limit: number
) => {
    const totalPages = Math.ceil(total / limit);

    return res.status(HttpStatus.OK).json({
        success: true,
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages,
            hasMore: page < totalPages,
        },
    });
};
