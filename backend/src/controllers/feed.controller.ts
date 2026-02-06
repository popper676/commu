import { Request, Response } from 'express';
import { asyncHandler, successResponse, HttpStatus, getPaginationParams, paginatedResponse, ApiError } from '../utils/response';
import feedService from '../services/feed.service';
import { PostVisibility } from '@prisma/client';

export const getFeed = asyncHandler(async (req: Request, res: Response) => {
    const { skip, limit, page } = getPaginationParams(req);
    const userId = req.user?.id || '';

    const posts = await feedService.getFeed(userId, skip, limit);

    // Note: Total count for pagination is skipped for performance, or can be added separately
    // For infinite scroll, just knowing if we got 'limit' items is often enough

    return successResponse(res, posts, 'Feed retrieved');
});

export const createPost = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(HttpStatus.UNAUTHORIZED, 'Authentication required');

    const { content, visibility, files } = req.body;

    if (!content && (!files || files.length === 0)) {
        throw new ApiError(HttpStatus.BAD_REQUEST, 'Post must have content or files');
    }

    const post = await feedService.createPost(req.user.id, {
        content,
        visibility: visibility as PostVisibility,
        files,
    });

    return successResponse(res, post, 'Post created successfully', HttpStatus.CREATED);
});

export const getPost = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const userId = req.user?.id;

    const post = await feedService.getPostById(id, userId);
    return successResponse(res, post, 'Post retrieved');
});

export const toggleLike = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(HttpStatus.UNAUTHORIZED, 'Authentication required');

    const id = req.params.id as string;
    const result = await feedService.toggleLikePost(id, req.user.id);

    return successResponse(res, result, result.liked ? 'Post liked' : 'Post unliked');
});

export const getComments = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const userId = req.user?.id;

    const comments = await feedService.getComments(id, userId);
    return successResponse(res, comments, 'Comments retrieved');
});

export const createComment = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(HttpStatus.UNAUTHORIZED, 'Authentication required');

    const id = req.params.id as string; // postId
    const { content, parentId } = req.body;

    if (!content) throw new ApiError(HttpStatus.BAD_REQUEST, 'Comment content required');

    const comment = await feedService.createComment(req.user.id, id, content, parentId);
    return successResponse(res, comment, 'Comment added', HttpStatus.CREATED);
});

export const sharePost = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(HttpStatus.UNAUTHORIZED, 'Authentication required');

    const id = req.params.id as string;
    const { caption } = req.body;

    const share = await feedService.sharePost(req.user.id, id, caption);
    return successResponse(res, share, 'Post shared successfully', HttpStatus.CREATED);
});
