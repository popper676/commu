import prisma from '../config/database';
import { PostVisibility, LikeType, ReactionEmoji } from '@prisma/client';
import { ApiError, HttpStatus } from '../utils/response';

export class FeedService {
    /**
     * Create a new post
     */
    async createPost(userId: string, data: { content: string; visibility?: PostVisibility; files?: string[] }) {
        const post = await prisma.post.create({
            data: {
                content: data.content,
                userId: userId,
                visibility: data.visibility || 'PUBLIC',
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        fullName: true,
                        avatar: true,
                    },
                },
            },
        });

        // Link files if any
        if (data.files && data.files.length > 0) {
            await prisma.file.updateMany({
                where: { id: { in: data.files }, userId: userId },
                data: { postId: post.id },
            });
        }

        // Return the complete post
        return this.getPostById(post.id, userId);
    }

    /**
     * Get global feed with pagination
     */
    async getFeed(userId: string, skip = 0, limit = 10) {
        const posts = await prisma.post.findMany({
            where: {
                OR: [
                    { visibility: 'PUBLIC' },
                    { userId: userId }, // My own private posts
                    // ToDo: Add FOLLOWERS logic when follower system is implemented
                ],
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        fullName: true,
                        avatar: true,
                    },
                },
                files: true,
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                        shares: true,
                    },
                },
                // Check if I liked this post
                likes: {
                    where: { userId: userId, type: 'POST' },
                    select: { id: true },
                },
            },
        });

        // Transform result to add 'isLiked' boolean
        return posts.map(post => ({
            ...post,
            isLiked: post.likes.length > 0,
            likes: undefined, // remove raw likes array
            likesCount: post._count.likes,
            commentsCount: post._count.comments,
            sharesCount: post._count.shares,
        }));
    }

    /**
     * Get single post by ID
     */
    async getPostById(postId: string, userId?: string) {
        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                user: {
                    select: { id: true, username: true, fullName: true, avatar: true },
                },
                files: true,
                _count: {
                    select: { likes: true, comments: true, shares: true },
                },
                likes: userId ? {
                    where: { userId: userId, type: 'POST' },
                    select: { id: true },
                } : false,
            },
        });

        if (!post) throw new ApiError(HttpStatus.NOT_FOUND, 'Post not found');

        return {
            ...post,
            isLiked: userId ? post.likes.length > 0 : false,
            likes: undefined,
            likesCount: post._count.likes,
            commentsCount: post._count.comments,
            sharesCount: post._count.shares,
        };
    }

    /**
     * Like or Unlike a post
     */
    async toggleLikePost(postId: string, userId: string) {
        const existingLike = await prisma.like.findUnique({
            where: {
                userId_postId: { userId, postId },
            },
        });

        if (existingLike) {
            await prisma.like.delete({
                where: { id: existingLike.id },
            });
            return { liked: false };
        } else {
            await prisma.like.create({
                data: {
                    userId,
                    postId,
                    type: 'POST',
                },
            });
            return { liked: true };
        }
    }

    /**
     * Create a comment
     */
    async createComment(userId: string, postId: string, content: string, parentId?: string) {
        // Verify post exists
        const post = await prisma.post.findUnique({ where: { id: postId } });
        if (!post) throw new ApiError(HttpStatus.NOT_FOUND, 'Post not found');

        const comment = await prisma.comment.create({
            data: {
                content,
                userId,
                postId,
                parentId,
            },
            include: {
                user: {
                    select: { id: true, username: true, fullName: true, avatar: true },
                },
            },
        });

        return comment;
    }

    /**
     * Get comments for a post
     */
    async getComments(postId: string, userId?: string) {
        const comments = await prisma.comment.findMany({
            where: { postId, parentId: null }, // Only top-level comments
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: { id: true, username: true, fullName: true, avatar: true },
                },
                replies: {
                    include: {
                        user: {
                            select: { id: true, username: true, fullName: true, avatar: true },
                        },
                    },
                    orderBy: { createdAt: 'asc' },
                },
                _count: {
                    select: { likes: true },
                },
                likes: userId ? {
                    where: { userId: userId, type: 'COMMENT' },
                    select: { id: true },
                } : false,
            },
        });

        // Transform to add isLiked
        return comments.map(comment => ({
            ...comment,
            isLiked: userId ? comment.likes.length > 0 : false,
            likesCount: comment._count.likes,
            likes: undefined,
            replies: comment.replies.map(reply => ({
                ...reply,
                // Replies usually don't have separate like counts in simplified views, but can be added
            })),
        }));
    }

    /**
     * Share a post
     */
    async sharePost(userId: string, postId: string, caption?: string) {
        const post = await prisma.post.findUnique({ where: { id: postId } });
        if (!post) throw new ApiError(HttpStatus.NOT_FOUND, 'Post not found');

        const share = await prisma.share.create({
            data: {
                userId,
                postId,
                caption,
            },
        });

        // Optionally create a new post referencing the shared content
        // For now tracking the share is enough

        return share;
    }
}

export default new FeedService();
