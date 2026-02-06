import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../types';

const prisma = new PrismaClient();

// Apply to become a creator
export const applyForCreator = async (req: AuthRequest, res: Response) => {
    try {
        const { reason, reasonMm, portfolio, category } = req.body;
        const userId = req.userId!;

        // Check if user is already a creator
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (user?.isCreator) {
            return res.status(400).json({ error: 'You are already a creator' });
        }

        // Check if there's a pending request
        const existingRequest = await prisma.creatorRequest.findFirst({
            where: {
                userId,
                status: 'PENDING',
            },
        });

        if (existingRequest) {
            return res.status(400).json({ error: 'You already have a pending request' });
        }

        const request = await prisma.creatorRequest.create({
            data: {
                userId,
                reason,
                reasonMm,
                portfolio,
                category,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        avatar: true,
                    },
                },
            },
        });

        res.status(201).json(request);
    } catch (error) {
        console.error('Apply for creator error:', error);
        res.status(500).json({ error: 'Failed to submit creator application' });
    }
};

// Get all creator requests (Admin only)
export const getCreatorRequests = async (req: AuthRequest, res: Response) => {
    try {
        // TODO: Add admin check
        const { status } = req.query;

        const where: any = {};
        if (status) where.status = status;

        const requests = await prisma.creatorRequest.findMany({
            where,
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        fullNameMm: true,
                        email: true,
                        avatar: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch creator requests' });
    }
};

// Review a creator request (Admin only)
export const reviewCreatorRequest = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const { status, reviewNotes } = req.body;

        // TODO: Add admin check

        const request = await prisma.creatorRequest.findUnique({
            where: { id: id as string },
        });

        if (!request) {
            return res.status(404).json({ error: 'Request not found' });
        }

        // Update the request
        const updated = await prisma.creatorRequest.update({
            where: { id: id as string },
            data: {
                status,
                reviewNotes,
                reviewedBy: req.userId,
                reviewedAt: new Date(),
            },
        });

        // If approved, update user to be a creator
        if (status === 'APPROVED') {
            await prisma.user.update({
                where: { id: request.userId },
                data: { isCreator: true },
            });
        }

        res.json(updated);
    } catch (error) {
        console.error('Review request error:', error);
        res.status(500).json({ error: 'Failed to review creator request' });
    }
};

// Follow a user
export const followUser = async (req: AuthRequest, res: Response) => {
    try {
        const { userId: targetUserId } = req.params;
        const followerId = req.userId!;

        if (followerId === targetUserId) {
            return res.status(400).json({ error: 'You cannot follow yourself' });
        }

        // Check if already following
        const existing = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId: targetUserId as string,
                },
            },
        });

        if (existing) {
            return res.status(400).json({ error: 'Already following this user' });
        }

        const follow = await prisma.follow.create({
            data: {
                followerId,
                followingId: targetUserId as string,
            },
        });

        res.status(201).json(follow);
    } catch (error) {
        console.error('Follow error:', error);
        res.status(500).json({ error: 'Failed to follow user' });
    }
};

// Unfollow a user
export const unfollowUser = async (req: AuthRequest, res: Response) => {
    try {
        const { userId: targetUserId } = req.params;
        const followerId = req.userId!;

        await prisma.follow.delete({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId: targetUserId as string,
                },
            },
        });

        res.json({ message: 'Unfollowed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to unfollow user' });
    }
};

// Get a user's followers
export const getFollowers = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const followers = await prisma.follow.findMany({
            where: { followingId: userId as string },
            include: {
                follower: {
                    select: {
                        id: true,
                        fullName: true,
                        fullNameMm: true,
                        username: true,
                        avatar: true,
                        isCreator: true,
                        creatorVerified: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json(followers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch followers' });
    }
};

// Get users a user is following
export const getFollowing = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const following = await prisma.follow.findMany({
            where: { followerId: userId as string },
            include: {
                following: {
                    select: {
                        id: true,
                        fullName: true,
                        fullNameMm: true,
                        username: true,
                        avatar: true,
                        isCreator: true,
                        creatorVerified: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json(following);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch following' });
    }
};

// Promote a community
export const promoteCommunity = async (req: AuthRequest, res: Response) => {
    try {
        const { communityId } = req.params;
        const { content, contentMm } = req.body;
        const userId = req.userId!;

        // Check if user is a creator
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user?.isCreator) {
            return res.status(403).json({ error: 'Only creators can promote content' });
        }

        // Check if user owns the community
        const community = await prisma.community.findUnique({
            where: { id: communityId as string },
        });

        if (!community) {
            return res.status(404).json({ error: 'Community not found' });
        }

        if (community.creatorId !== userId) {
            return res.status(403).json({ error: 'You can only promote your own communities' });
        }

        const post = await prisma.post.create({
            data: {
                userId,
                content,
                contentMm,
                type: 'PROMOTION',
                promotedCommunityId: communityId as string,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        avatar: true,
                        isCreator: true,
                        creatorVerified: true,
                    },
                },
                promotedCommunity: true,
            },
        });

        res.status(201).json(post);
    } catch (error) {
        console.error('Promote community error:', error);
        res.status(500).json({ error: 'Failed to promote community' });
    }
};

// Promote a challenge
export const promoteChallenge = async (req: AuthRequest, res: Response) => {
    try {
        const { challengeId } = req.params;
        const { content, contentMm } = req.body;
        const userId = req.userId!;

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user?.isCreator) {
            return res.status(403).json({ error: 'Only creators can promote content' });
        }

        const challenge = await prisma.challenge.findUnique({
            where: { id: challengeId as string },
        });

        if (!challenge) {
            return res.status(404).json({ error: 'Challenge not found' });
        }

        if (challenge.creatorId !== userId) {
            return res.status(403).json({ error: 'You can only promote your own challenges' });
        }

        const post = await prisma.post.create({
            data: {
                userId,
                content,
                contentMm,
                type: 'PROMOTION',
                promotedChallengeId: challengeId as string,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        avatar: true,
                        isCreator: true,
                        creatorVerified: true,
                    },
                },
                promotedChallenge: true,
            },
        });

        res.status(201).json(post);
    } catch (error) {
        console.error('Promote challenge error:', error);
        res.status(500).json({ error: 'Failed to promote challenge' });
    }
};

// Promote a course
export const promoteCourse = async (req: AuthRequest, res: Response) => {
    try {
        const { content, contentMm, courseId, courseData } = req.body;
        const userId = req.userId!;

        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user?.isCreator) {
            return res.status(403).json({ error: 'Only creators can promote content' });
        }

        // For now, store course ID as string. Later can add Course model.
        const post = await prisma.post.create({
            data: {
                userId,
                content,
                contentMm,
                type: 'PROMOTION',
                promotedCourseId: courseId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        avatar: true,
                        isCreator: true,
                        creatorVerified: true,
                    },
                },
            },
        });

        res.status(201).json(post);
    } catch (error) {
        console.error('Promote course error:', error);
        res.status(500).json({ error: 'Failed to promote course' });
    }
};
