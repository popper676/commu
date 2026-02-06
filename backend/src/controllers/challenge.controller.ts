import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../types';

const prisma = new PrismaClient();

// Get all challenges
export const getChallenges = async (req: Request, res: Response) => {
    try {
        const { status, category } = req.query;
        const where: any = {};

        if (status) where.status = status;
        if (category) where.category = category;

        const challenges = await prisma.challenge.findMany({
            where,
            include: {
                creator: {
                    select: {
                        id: true,
                        fullName: true,
                        fullNameMm: true,
                        avatar: true,
                    },
                },
                _count: {
                    select: { submissions: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json(challenges);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch challenges' });
    }
};

// Get single challenge
export const getChallenge = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        const challenge = await prisma.challenge.findUnique({
            where: { id },
            include: {
                creator: {
                    select: {
                        id: true,
                        fullName: true,
                        fullNameMm: true,
                        avatar: true,
                    },
                },
                submissions: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                fullName: true,
                                fullNameMm: true,
                                avatar: true,
                            },
                        },
                    },
                    orderBy: { createdAt: 'desc' },
                },
            },
        });

        if (!challenge) {
            return res.status(404).json({ error: 'Challenge not found' });
        }

        res.json(challenge);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch challenge' });
    }
};

// Create challenge
export const createChallenge = async (req: AuthRequest, res: Response) => {
    try {
        const {
            title,
            titleMm,
            description,
            descriptionMm,
            thumbnail,
            deadline,
            prize,
            prizeMm,
            category,
            categoryMm,
        } = req.body;

        const challenge = await prisma.challenge.create({
            data: {
                title,
                titleMm,
                description,
                descriptionMm,
                creatorId: req.userId!,
                thumbnail,
                deadline: new Date(deadline),
                prize,
                prizeMm,
                category,
                categoryMm,
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        fullName: true,
                        avatar: true,
                    },
                },
            },
        });

        res.status(201).json(challenge);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create challenge' });
    }
};

// Update challenge
export const updateChallenge = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.params.id as string;

        const challenge = await prisma.challenge.findUnique({ where: { id } });

        if (!challenge) {
            return res.status(404).json({ error: 'Challenge not found' });
        }

        if (challenge.creatorId !== req.userId) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        const updated = await prisma.challenge.update({
            where: { id },
            data: req.body,
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update challenge' });
    }
};

// Delete challenge
export const deleteChallenge = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.params.id as string;

        const challenge = await prisma.challenge.findUnique({ where: { id } });

        if (!challenge) {
            return res.status(404).json({ error: 'Challenge not found' });
        }

        if (challenge.creatorId !== req.userId) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        await prisma.challenge.delete({ where: { id } });

        res.json({ message: 'Challenge deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete challenge' });
    }
};

// Get submissions for a challenge
export const getSubmissions = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        const submissions = await prisma.challengeSubmission.findMany({
            where: { challengeId: id },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        fullNameMm: true,
                        avatar: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json(submissions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch submissions' });
    }
};

// Create submission
export const createSubmission = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.params.id as string;
        const { content, contentMm } = req.body;
        const files = req.files as Express.Multer.File[];

        // Check if challenge exists
        const challenge = await prisma.challenge.findUnique({ where: { id } });

        if (!challenge) {
            return res.status(404).json({ error: 'Challenge not found' });
        }

        // Check if deadline passed
        if (new Date() > new Date(challenge.deadline)) {
            return res.status(400).json({ error: 'Challenge deadline has passed' });
        }

        // Check if user already submitted
        const existing = await prisma.challengeSubmission.findUnique({
            where: {
                challengeId_userId: {
                    challengeId: id,
                    userId: req.userId!,
                },
            },
        });

        if (existing) {
            return res.status(400).json({ error: 'You have already submitted to this challenge' });
        }

        // Process uploaded files
        const attachments = files?.map((file: any) => file.path || file.url) || [];

        const submission = await prisma.challengeSubmission.create({
            data: {
                challengeId: id,
                userId: req.userId!,
                content,
                contentMm,
                attachments,
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
        });

        res.status(201).json(submission);
    } catch (error) {
        console.error('Submission error:', error);
        res.status(500).json({ error: 'Failed to create submission' });
    }
};

// Update submission
export const updateSubmission = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.params.id as string;
        const submissionId = req.params.submissionId as string;

        const submission = await prisma.challengeSubmission.findUnique({
            where: { id: submissionId },
        });

        if (!submission) {
            return res.status(404).json({ error: 'Submission not found' });
        }

        if (submission.userId !== req.userId) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        const updated = await prisma.challengeSubmission.update({
            where: { id: submissionId },
            data: req.body,
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update submission' });
    }
};

// Delete submission
export const deleteSubmission = async (req: AuthRequest, res: Response) => {
    try {
        const submissionId = req.params.submissionId as string;

        const submission = await prisma.challengeSubmission.findUnique({
            where: { id: submissionId },
        });

        if (!submission) {
            return res.status(404).json({ error: 'Submission not found' });
        }

        if (submission.userId !== req.userId) {
            return res.status(403).json({ error: 'Not authorized' });
        }

        await prisma.challengeSubmission.delete({ where: { id: submissionId } });

        res.json({ message: 'Submission deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete submission' });
    }
};

// Score submission (challenge creator only)
export const scoreSubmission = async (req: AuthRequest, res: Response) => {
    try {
        const id = req.params.id as string;
        const submissionId = req.params.submissionId as string;
        const { score, feedback, feedbackMm } = req.body;

        const challenge = await prisma.challenge.findUnique({ where: { id } });

        if (!challenge) {
            return res.status(404).json({ error: 'Challenge not found' });
        }

        if (challenge.creatorId !== req.userId) {
            return res.status(403).json({ error: 'Only challenge creator can score submissions' });
        }

        const submission = await prisma.challengeSubmission.update({
            where: { id: submissionId },
            data: { score, feedback, feedbackMm },
        });

        res.json(submission);
    } catch (error) {
        res.status(500).json({ error: 'Failed to score submission' });
    }
};
