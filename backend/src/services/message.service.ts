import prisma from '../config/database';
import { ApiError, HttpStatus } from '../utils/response';
import app from '../app';
import { emitToChannel } from '../socket';

export class MessageService {
    /**
     * Send a message to a channel
     */
    async sendMessage(userId: string, channelId: string, data: { content?: string; files?: string[] }) {
        // 1. Verify channel exists
        const channel = await prisma.channel.findUnique({
            where: { id: channelId },
            include: { community: { select: { id: true } } },
        });

        if (!channel) throw new ApiError(HttpStatus.NOT_FOUND, 'Channel not found');

        // 2. Verify membership
        const isMember = await prisma.communityMember.findUnique({
            where: {
                userId_communityId: {
                    userId,
                    communityId: channel.community.id,
                },
            },
        });

        if (!isMember) throw new ApiError(HttpStatus.FORBIDDEN, 'You must join the community to send messages');

        // 3. Create Message
        const message = await prisma.message.create({
            data: {
                content: data.content,
                channelId,
                userId,
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
                files: true,
            },
        });

        // 4. Link files
        if (data.files && data.files.length > 0) {
            await prisma.file.updateMany({
                where: { id: { in: data.files }, userId: userId },
                data: { messageId: message.id },
            });
            // Refetch with files
            return this.getMessageById(message.id);
        }

        // 5. Emit real-time event
        const io = app.get('io');
        if (io) {
            emitToChannel(io, channelId, 'message:new', message);
        }

        return message;
    }

    /**
     * Get messages for a channel (History)
     */
    async getMessages(channelId: string, userId: string, cursor?: string, limit = 50) {
        // Verify membership
        const channel = await prisma.channel.findUnique({
            where: { id: channelId },
            include: { community: { select: { id: true } } },
        });

        if (!channel) throw new ApiError(HttpStatus.NOT_FOUND, 'Channel not found');

        const isMember = await prisma.communityMember.findUnique({
            where: {
                userId_communityId: { userId, communityId: channel.community.id },
            },
        });

        if (!isMember) throw new ApiError(HttpStatus.FORBIDDEN, 'You must join the community to view messages');

        const messages = await prisma.message.findMany({
            where: { channelId },
            take: limit,
            skip: cursor ? 1 : 0,
            cursor: cursor ? { id: cursor } : undefined,
            orderBy: { createdAt: 'desc' }, // Latest first
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
            },
        });

        return messages.reverse(); // Return oldest first for chat UI
    }

    /**
     * Get message by ID
     */
    async getMessageById(messageId: string) {
        return prisma.message.findUnique({
            where: { id: messageId },
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
            },
        });
    }
}

export default new MessageService();
