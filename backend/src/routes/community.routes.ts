import { Router } from 'express';
import * as communityController from '../controllers/community.controller';
import { authenticate, authenticateOptional } from '../middleware/auth.middleware';
import memberRoutes from './member.routes';

const router = Router();

// Communities
router.get('/', communityController.getCommunities);
router.post('/', authenticate, communityController.createCommunity);
router.get('/:id', authenticateOptional, communityController.getCommunity);

// Members
router.post('/:id/join', authenticate, communityController.joinCommunity);
router.post('/:id/leave', authenticate, communityController.leaveCommunity);

// Channels
router.post('/:id/channels', authenticate, communityController.createChannel);

// Member Management (nested routes)
router.use('/:communityId/members', memberRoutes);

export default router;
