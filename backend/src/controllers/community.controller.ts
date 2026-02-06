import { Request, Response } from 'express';
import { asyncHandler, successResponse, HttpStatus, getPaginationParams, ApiError } from '../utils/response';
import communityService from '../services/community.service';
import { ChannelType } from '@prisma/client';

export const getCommunities = asyncHandler(async (req: Request, res: Response) => {
    const { skip, limit } = getPaginationParams(req);
    const communities = await communityService.getCommunities(skip, limit);

    return successResponse(res, communities, 'Communities retrieved');
});

export const getCommunity = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const userId = req.user?.id;

    const community = await communityService.getCommunityById(id, userId);
    return successResponse(res, community, 'Community details retrieved');
});

export const createCommunity = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(HttpStatus.UNAUTHORIZED, 'Authentication required');

    const { name, description, category, isPaid, entryFee } = req.body;

    if (!name || !description || !category) {
        throw new ApiError(HttpStatus.BAD_REQUEST, 'Name, description and category are required');
    }

    const community = await communityService.createCommunity(req.user.id, {
        name, description, category, isPaid, entryFee
    });

    return successResponse(res, community, 'Community created successfully', HttpStatus.CREATED);
});

export const joinCommunity = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(HttpStatus.UNAUTHORIZED, 'Authentication required');

    const id = req.params.id as string;
    const result = await communityService.joinCommunity(req.user.id, id);

    return successResponse(res, result, 'Joined community successfully');
});

export const leaveCommunity = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(HttpStatus.UNAUTHORIZED, 'Authentication required');

    const id = req.params.id as string;
    const result = await communityService.leaveCommunity(req.user.id, id);

    return successResponse(res, result, 'Left community successfully');
});

export const createChannel = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) throw new ApiError(HttpStatus.UNAUTHORIZED, 'Authentication required');

    const id = req.params.id as string; // communityId
    const { name, type } = req.body;

    if (!name) throw new ApiError(HttpStatus.BAD_REQUEST, 'Channel name required');

    const channel = await communityService.createChannel(
        req.user.id,
        id,
        { name, type: type as ChannelType || 'TEXT' }
    );

    return successResponse(res, channel, 'Channel created successfully', HttpStatus.CREATED);
});
