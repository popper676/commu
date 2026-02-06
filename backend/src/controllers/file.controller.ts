import { Response } from 'express';
import { asyncHandler, successResponse, HttpStatus, ApiError } from '../utils/response';
import fileService from '../services/file.service';
import { AuthRequest } from '../types';

export const uploadFile = asyncHandler(async (req: AuthRequest, res: Response) => {
    if (!req.file) {
        throw new ApiError(HttpStatus.BAD_REQUEST, 'No file uploaded');
    }

    if (!req.user) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, 'Authentication required');
    }

    // Determine context if provided (for message or post attachment)
    const messageId = req.body.messageId;
    const postId = req.body.postId;

    const file = await fileService.saveFileMetadata(
        req.file,
        req.user.id,
        messageId,
        postId
    );

    return successResponse(res, file, 'File uploaded successfully', HttpStatus.CREATED);
});

export const deleteFile = asyncHandler(async (req: AuthRequest, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    if (!req.user) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, 'Authentication required');
    }

    await fileService.deleteFile(id, req.user.id);

    return successResponse(res, null, 'File deleted successfully');
});
