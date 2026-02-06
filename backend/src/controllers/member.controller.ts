import { Request, Response } from 'express';
import { PrismaClient, MemberRole } from '@prisma/client';
import { AuthRequest } from '../types';

const prisma = new PrismaClient();

// Helper to check if user has admin permissions
const hasAdminPermissions = async (communityId: string, userId: string): Promise<boolean> => {
    const member = await prisma.communityMember.findUnique({
        where: {
            userId_communityId: { userId, communityId },
        },
    });

    return member?.role === 'OWNER' || member?.role === 'ADMIN';
};

// Get all members in a community
export const getMembers = async (req: AuthRequest, res: Response) => {
    try {
        const communityId = req.params.communityId as string;
        const { role, search } = req.query;

        const where: any = { communityId };
        if (role) where.role = role;

        const members = await prisma.communityMember.findMany({
            where,
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        fullNameMm: true,
                        username: true,
                        avatar: true,
                    },
                },
            },
            orderBy: [
                { role: 'asc' }, // OWNER, ADMIN, MODERATOR, MEMBER
                { joinedAt: 'desc' },
            ],
        });

        res.json(members);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch members' });
    }
};

// Get single member details
export const getMember = async (req: AuthRequest, res: Response) => {
    try {
        const communityId = req.params.communityId as string;
        const memberId = req.params.memberId as string;

        const member = await prisma.communityMember.findFirst({
            where: {
                id: memberId,
                communityId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        fullNameMm: true,
                        username: true,
                        avatar: true,
                        bio: true,
                    },
                },
            },
        });

        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        res.json(member);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch member' });
    }
};

// Update member role (Admin only)
export const updateMemberRole = async (req: AuthRequest, res: Response) => {
    try {
        const communityId = req.params.communityId as string;
        const memberId = req.params.memberId as string;
        const { role } = req.body;

        // Check if requester has admin permissions
        const isAdmin = await hasAdminPermissions(communityId, req.userId!);
        if (!isAdmin) {
            return res.status(403).json({ error: 'Only admins can change roles' });
        }

        // Get target member
        const member = await prisma.communityMember.findFirst({
            where: { id: memberId, communityId },
        });

        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        // Cannot change owner role
        if (member.role === 'OWNER') {
            return res.status(403).json({ error: 'Cannot change owner role' });
        }

        // Update role and auto-set permissions based on role
        let permissions = {};
        if (role === 'ADMIN') {
            permissions = {
                canSendMessages: true,
                canSendMedia: true,
                canSendStickers: true,
                canSendPolls: true,
                canAddMembers: true,
                canPinMessages: true,
                canChangeInfo: true,
                canDeleteMessages: true,
                canBanUsers: true,
                canManageChannels: true,
            };
        } else if (role === 'MODERATOR') {
            permissions = {
                canSendMessages: true,
                canSendMedia: true,
                canSendStickers: true,
                canSendPolls: true,
                canDeleteMessages: true,
                canBanUsers: true,
                canPinMessages: true,
            };
        } else {
            permissions = {
                canSendMessages: true,
                canSendMedia: true,
                canSendStickers: true,
                canSendPolls: true,
                canAddMembers: false,
                canPinMessages: false,
                canChangeInfo: false,
                canDeleteMessages: false,
                canBanUsers: false,
                canManageChannels: false,
            };
        }

        const updated = await prisma.communityMember.update({
            where: { id: memberId },
            data: { role, ...permissions },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        avatar: true,
                    },
                },
            },
        });

        res.json(updated);
    } catch (error) {
        console.error('Update role error:', error);
        res.status(500).json({ error: 'Failed to update member role' });
    }
};

// Update individual member permissions (Admin only)
export const updateMemberPermissions = async (req: AuthRequest, res: Response) => {
    try {
        const communityId = req.params.communityId as string;
        const memberId = req.params.memberId as string;
        const permissions = req.body;

        // Check if requester has admin permissions
        const isAdmin = await hasAdminPermissions(communityId, req.userId!);
        if (!isAdmin) {
            return res.status(403).json({ error: 'Only admins can change permissions' });
        }

        const member = await prisma.communityMember.findFirst({
            where: { id: memberId, communityId },
        });

        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        // Cannot change owner permissions
        if (member.role === 'OWNER') {
            return res.status(403).json({ error: 'Cannot change owner permissions' });
        }

        const updated = await prisma.communityMember.update({
            where: { id: memberId },
            data: permissions,
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update permissions' });
    }
};

// Remove member from community (Admin only)
export const removeMember = async (req: AuthRequest, res: Response) => {
    try {
        const communityId = req.params.communityId as string;
        const memberId = req.params.memberId as string;

        // Check if requester has admin permissions
        const isAdmin = await hasAdminPermissions(communityId, req.userId!);
        if (!isAdmin) {
            return res.status(403).json({ error: 'Only admins can remove members' });
        }

        const member = await prisma.communityMember.findFirst({
            where: { id: memberId, communityId },
        });

        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        // Cannot remove owner
        if (member.role === 'OWNER') {
            return res.status(403).json({ error: 'Cannot remove owner' });
        }

        await prisma.communityMember.delete({
            where: { id: memberId },
        });

        res.json({ message: 'Member removed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to remove member' });
    }
};

// Ban member (Admin only)
export const banMember = async (req: AuthRequest, res: Response) => {
    try {
        const communityId = req.params.communityId as string;
        const memberId = req.params.memberId as string;
        const { reason } = req.body;

        const isAdmin = await hasAdminPermissions(communityId, req.userId!);
        if (!isAdmin) {
            return res.status(403).json({ error: 'Only admins can ban members' });
        }

        const member = await prisma.communityMember.findFirst({
            where: { id: memberId, communityId },
        });

        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        if (member.role === 'OWNER' || member.role === 'ADMIN') {
            return res.status(403).json({ error: 'Cannot ban admins or owner' });
        }

        const updated = await prisma.communityMember.update({
            where: { id: memberId },
            data: {
                isBanned: true,
                bannedAt: new Date(),
                bannedBy: req.userId,
                banReason: reason,
            },
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to ban member' });
    }
};

// Unban member (Admin only)
export const unbanMember = async (req: AuthRequest, res: Response) => {
    try {
        const communityId = req.params.communityId as string;
        const memberId = req.params.memberId as string;

        const isAdmin = await hasAdminPermissions(communityId, req.userId!);
        if (!isAdmin) {
            return res.status(403).json({ error: 'Only admins can unban members' });
        }

        const updated = await prisma.communityMember.update({
            where: { id: memberId },
            data: {
                isBanned: false,
                bannedAt: null,
                bannedBy: null,
                banReason: null,
            },
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to unban member' });
    }
};

// Mute member (Moderator+)
export const muteMember = async (req: AuthRequest, res: Response) => {
    try {
        const communityId = req.params.communityId as string;
        const memberId = req.params.memberId as string;
        const { duration } = req.body; // Duration in minutes

        const requester = await prisma.communityMember.findUnique({
            where: {
                userId_communityId: { userId: req.userId!, communityId },
            },
        });

        if (!requester || (requester.role !== 'OWNER' && requester.role !== 'ADMIN' && requester.role !== 'MODERATOR')) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }

        const mutedUntil = duration
            ? new Date(Date.now() + duration * 60 * 1000)
            : null; // Null = permanent

        const updated = await prisma.communityMember.update({
            where: { id: memberId },
            data: {
                isMuted: true,
                mutedUntil,
            },
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to mute member' });
    }
};

// Unmute member (Moderator+)
export const unmuteMember = async (req: AuthRequest, res: Response) => {
    try {
        const communityId = req.params.communityId as string;
        const memberId = req.params.memberId as string;

        const requester = await prisma.communityMember.findUnique({
            where: {
                userId_communityId: { userId: req.userId!, communityId },
            },
        });

        if (!requester || (requester.role !== 'OWNER' && requester.role !== 'ADMIN' && requester.role !== 'MODERATOR')) {
            return res.status(403).json({ error: 'Insufficient permissions' });
        }

        const updated = await prisma.communityMember.update({
            where: { id: memberId },
            data: {
                isMuted: false,
                mutedUntil: null,
            },
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to unmute member' });
    }
};

// Invite members (Users with permission)
export const inviteMembers = async (req: AuthRequest, res: Response) => {
    try {
        const communityId = req.params.communityId as string;
        const { userIds } = req.body;

        const requester = await prisma.communityMember.findUnique({
            where: {
                userId_communityId: { userId: req.userId!, communityId },
            },
        });

        if (!requester || !requester.canAddMembers) {
            return res.status(403).json({ error: 'You do not have permission to add members' });
        }

        // Add multiple members
        const newMembers = await Promise.all(
            userIds.map((userId: string) =>
                prisma.communityMember.create({
                    data: {
                        userId,
                        communityId,
                    },
                    include: {
                        user: {
                            select: {
                                id: true,
                                fullName: true,
                                avatar: true,
                            },
                        },
                    },
                })
            )
        );

        res.status(201).json(newMembers);
    } catch (error) {
        console.error('Invite error:', error);
        res.status(500).json({ error: 'Failed to invite members' });
    }
};
