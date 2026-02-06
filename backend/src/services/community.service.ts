import prisma from '../config/database';
import { ChannelType } from '@prisma/client';
import { ApiError, HttpStatus } from '../utils/response';

export class CommunityService {
    /**
     * Create a new community
     */
    async createCommunity(userId: string, data: {
        name: string;
        description: string;
        category: string;
        isPaid?: boolean;
        entryFee?: number;
    }) {
        // Transaction to create community, add creator as admin, and create default channel
        return prisma.$transaction(async (tx) => {
            // 1. Create Community
            const community = await tx.community.create({
                data: {
                    name: data.name,
                    description: data.description,
                    category: data.category,
                    isPaid: data.isPaid || false,
                    entryFee: data.entryFee,
                    creatorId: userId,
                },
            });

            // 2. Add Creator as Admin
            await tx.communityMember.create({
                data: {
                    userId,
                    communityId: community.id,
                    role: 'ADMIN',
                },
            });

            // 3. Create Default "General" Channel
            const channel = await tx.channel.create({
                data: {
                    name: 'general',
                    type: 'TEXT',
                    communityId: community.id,
                },
            });

            return { ...community, channels: [channel] };
        });
    }

    /**
     * Get all communities (Discovery)
     */
    async getCommunities(skip = 0, limit = 20) {
        return prisma.community.findMany({
            skip,
            take: limit,
            include: {
                _count: {
                    select: { members: true },
                },
            },
            orderBy: { members: { _count: 'desc' } }, // Popular first
        });
    }

    /**
     * Get community details
     */
    async getCommunityById(id: string, userId?: string) {
        const community = await prisma.community.findUnique({
            where: { id },
            include: {
                channels: true,
                _count: {
                    select: { members: true },
                },
                members: userId ? {
                    where: { userId },
                    select: { role: true },
                } : false,
            },
        });

        if (!community) throw new ApiError(HttpStatus.NOT_FOUND, 'Community not found');

        return {
            ...community,
            isMember: userId ? community.members.length > 0 : false,
            userRole: userId && community.members.length > 0 ? community.members[0].role : null,
            members: undefined, // Hide raw members array implementation detail
        };
    }

    /**
     * Join a community
     */
    async joinCommunity(userId: string, communityId: string) {
        const community = await prisma.community.findUnique({ where: { id: communityId } });
        if (!community) throw new ApiError(HttpStatus.NOT_FOUND, 'Community not found');

        if (community.isPaid) {
            // Payment logic would go here
            // For now, we'll allow joining but in real app verify payment first
        }

        // Check if already member
        const existingMember = await prisma.communityMember.findUnique({
            where: {
                userId_communityId: { userId, communityId },
            },
        });

        if (existingMember) {
            throw new ApiError(HttpStatus.CONFLICT, 'Already a member');
        }

        await prisma.communityMember.create({
            data: {
                userId,
                communityId,
                role: 'MEMBER',
            },
        });

        return { joined: true };
    }

    /**
     * Leave a community
     */
    async leaveCommunity(userId: string, communityId: string) {
        // Cannot leave if creator (must transfer ownership or delete)
        const community = await prisma.community.findUnique({ where: { id: communityId } });
        if (community?.creatorId === userId) {
            throw new ApiError(HttpStatus.FORBIDDEN, 'Creator cannot leave community. Delete it instead.');
        }

        await prisma.communityMember.delete({
            where: {
                userId_communityId: { userId, communityId },
            },
        });

        return { left: true };
    }

    /**
     * Create a channel
     */
    async createChannel(userId: string, communityId: string, data: { name: string; type: ChannelType }) {
        // Verify permission (Admin only)
        const member = await prisma.communityMember.findUnique({
            where: { userId_communityId: { userId, communityId } },
        });

        if (!member || (member.role !== 'ADMIN' && member.role !== 'MODERATOR')) {
            throw new ApiError(HttpStatus.FORBIDDEN, 'Only admins/moderators can create channels');
        }

        return prisma.channel.create({
            data: {
                name: data.name,
                type: data.type,
                communityId,
            },
        });
    }
}

export default new CommunityService();
