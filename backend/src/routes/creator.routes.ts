import { Router } from 'express';
import * as creatorController from '../controllers/creator.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Creator Requests
router.post('/request', authenticate, creatorController.applyForCreator);
router.get('/requests', authenticate, creatorController.getCreatorRequests); // Admin only
router.put('/requests/:id', authenticate, creatorController.reviewCreatorRequest); // Admin only

// Follow System
router.post('/follow/:userId', authenticate, creatorController.followUser);
router.delete('/follow/:userId', authenticate, creatorController.unfollowUser);
router.get('/:userId/followers', creatorController.getFollowers);
router.get('/:userId/following', creatorController.getFollowing);

// Promotional Posts
router.post('/promote/community/:communityId', authenticate, creatorController.promoteCommunity);
router.post('/promote/challenge/:challengeId', authenticate, creatorController.promoteChallenge);
router.post('/promote/course', authenticate, creatorController.promoteCourse);

export default router;
