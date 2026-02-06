import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../types';

const prisma = new PrismaClient();

// Get all conversations for the user
export const getConversations = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId!;

        const conversations = await prisma.directConversation.findMany({
            where: {
                OR: [{ user1Id: userId }, { user2Id: userId }],
            },
            include: {
                messages: {
                    orderBy: { createdAt: 'desc' },
                    take: 1, // Last message
                },
            },
            orderBy: { updatedAt: 'desc' },
        });

        res.json(conversations);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch conversations' });
    }
};

// Get or create a conversation with another user
export const getOrCreateConversation = async (req: AuthRequest, res: Response) => {
    try {
        const otherUserId = req.params.userId as string;
        const currentUserId = req.userId!;

        if (currentUserId === otherUserId) {
            return res.status(400).json({ error: 'Cannot create conversation with yourself' });
        }

        // Check if conversation already exists (either direction)
        let conversation = await prisma.directConversation.findFirst({
            where: {
                OR: [
                    { user1Id: currentUserId, user2Id: otherUserId },
                    { user1Id: otherUserId, user2Id: currentUserId },
                ],
            },
            include: {
                messages: {
                    orderBy: { createdAt: 'asc' },
                    take: 50, // Initial load
                },
            },
        });

        // Create if doesn't exist
        if (!conversation) {
            conversation = await prisma.directConversation.create({
                data: {
                    user1Id: currentUserId,
                    user2Id: otherUserId,
                },
                include: {
                    messages: true,
                },
            });
        }

        res.json(conversation);
    } catch (error) {
        console.error('Get conversation error:', error);
        res.status(500).json({ error: 'Failed to get conversation' });
    }
};

// Get messages in a conversation
export const getMessages = async (req: AuthRequest, res: Response) => {
    try {
        const conversationId = req.params.conversationId as string;
        const { before, limit = 50 } = req.query;

        const userId = req.userId!;

        // Verify user is part of conversation
        const conversation = await prisma.directConversation.findFirst({
            where: {
                id: conversationId,
                OR: [{ user1Id: userId }, { user2Id: userId }],
            },
        });

        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        const where: any = { conversationId };
        if (before) {
            where.createdAt = { lt: new Date(before as string) };
        }

        const messages = await prisma.directMessage.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: Number(limit),
        });

        res.json(messages.reverse());
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
};

// Send a direct message
export const sendMessage = async (req: AuthRequest, res: Response) => {
    try {
        const conversationId = req.params.conversationId as string;
        const { content } = req.body;
        const userId = req.userId!;

        // Verify user is part of conversation
        const conversation = await prisma.directConversation.findFirst({
            where: {
                id: conversationId,
                OR: [{ user1Id: userId }, { user2Id: userId }],
            },
        });

        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        const message = await prisma.directMessage.create({
            data: {
                conversationId,
                senderId: userId,
                content,
            },
        });

        // Update conversation timestamp
        await prisma.directConversation.update({
            where: { id: conversationId },
            data: { updatedAt: new Date() },
        });

        res.status(201).json(message);
    } catch (error) {
        console.error('Send message error:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};

// Edit a message
export const editMessage = async (req: AuthRequest, res: Response) => {
    try {
        const messageId = req.params.messageId as string;
        const { content } = req.body;
        const userId = req.userId!;

        const message = await prisma.directMessage.findUnique({
            where: { id: messageId },
        });

        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        if (message.senderId !== userId) {
            return res.status(403).json({ error: 'You can only edit your own messages' });
        }

        const updated = await prisma.directMessage.update({
            where: { id: messageId },
            data: { content, edited: true },
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to edit message' });
    }
};

// Delete a message
export const deleteMessage = async (req: AuthRequest, res: Response) => {
    try {
        const messageId = req.params.messageId as string;
        const userId = req.userId!;

        const message = await prisma.directMessage.findUnique({
            where: { id: messageId },
        });

        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        if (message.senderId !== userId) {
            return res.status(403).json({ error: 'You can only delete your own messages' });
        }

        await prisma.directMessage.delete({
            where: { id: messageId },
        });

        res.json({ message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete message' });
    }
};

// Mark message as read
export const markAsRead = async (req: AuthRequest, res: Response) => {
    try {
        const messageId = req.params.messageId as string;
        const userId = req.userId!;

        const message = await prisma.directMessage.findUnique({
            where: { id: messageId },
        });

        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }

        // Get conversation to verify receiver
        const conversation = await prisma.directConversation.findUnique({
            where: { id: message.conversationId },
        });

        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        // Only the receiver can mark as read
        const isReceiver =
            (conversation.user1Id === userId && message.senderId !== userId) ||
            (conversation.user2Id === userId && message.senderId !== userId);

        if (!isReceiver) {
            return res.status(403).json({ error: 'Only receiver can mark as read' });
        }

        const updated = await prisma.directMessage.update({
            where: { id: messageId },
            data: {
                read: true,
                readAt: new Date(),
            },
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to mark message as read' });
    }
};
