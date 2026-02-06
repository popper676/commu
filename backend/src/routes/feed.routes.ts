import { Router } from 'express';
import * as feedController from '../controllers/feed.controller';
import { authenticate, authenticateOptional } from '../middleware/auth.middleware';

const router = Router();

// Feed
router.get('/', authenticateOptional, feedController.getFeed);
router.post('/posts', authenticate, feedController.createPost);

// Single Post
router.get('/posts/:id', authenticateOptional, feedController.getPost);
router.post('/posts/:id/like', authenticate, feedController.toggleLike);
router.post('/posts/:id/share', authenticate, feedController.sharePost);

// Comments
router.get('/posts/:id/comments', authenticateOptional, feedController.getComments);
router.post('/posts/:id/comments', authenticate, feedController.createComment);

export default router;
