import { Request, Response } from 'express';
import { asyncHandler, successResponse, HttpStatus } from '../utils/response';
import authService from '../services/auth.service';
import { registerSchema, loginSchema, refreshSchema } from '../validators/auth.validator';
import { ApiError } from '../utils/response';

export const register = asyncHandler(async (req: Request, res: Response) => {
    // Validate input
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
        throw new ApiError(HttpStatus.BAD_REQUEST, 'Validation error', false);
    }

    const result = await authService.register(validation.data);
    return successResponse(res, result, 'User registered successfully', HttpStatus.CREATED);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
    // Validate input
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
        throw new ApiError(HttpStatus.BAD_REQUEST, 'Invalid input');
    }

    const result = await authService.login(validation.data);
    return successResponse(res, result, 'Login successful');
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
    const validation = refreshSchema.safeParse(req.body);

    if (!validation.success) {
        throw new ApiError(HttpStatus.BAD_REQUEST, 'Refresh token required');
    }

    const tokens = await authService.refresh(validation.data.refreshToken);
    return successResponse(res, tokens, 'Token refreshed successfully');
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    await authService.logout(refreshToken);
    return successResponse(res, null, 'Logged out successfully');
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, 'Not authenticated');
    }

    const user = await authService.getMe(req.user.id);
    return successResponse(res, user, 'User profile retrieved');
});
