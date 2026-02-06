import { Request, Response } from 'express';
import { asyncHandler, successResponse, HttpStatus, ApiError } from '../utils/response';
import messageService from '../services/message.service';

export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(HttpStatus.UNAUTHORIZED, 'Authentication required');

    const id = req.params.id as string; // channelId
    const { content, files } = req.body;

    if (!content && (!files || files.length === 0)) {
        throw new ApiError(HttpStatus.BAD_REQUEST, 'Message must have content or files');
    }

    const message = await messageService.sendMessage(req.user.id, id, { content, files });
    return successResponse(res, message, 'Message sent', HttpStatus.CREATED);
});

export const getMessages = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(HttpStatus.UNAUTHORIZED, 'Authentication required');

    const id = req.params.id as string; // channelId
    const { cursor, limit } = req.query;

    const messages = await messageService.getMessages(
        id,
        req.user.id,
        cursor as string,
        limit ? parseInt(limit as string) : 50
    );

    return successResponse(res, messages, 'Messages retrieved');
});
