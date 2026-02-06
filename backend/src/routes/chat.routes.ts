import { Router } from 'express';
import * as messageController from '../controllers/message.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Messages (Channel ID in params)
router.get('/channels/:id/messages', authenticate, messageController.getMessages);
router.post('/channels/:id/messages', authenticate, messageController.sendMessage);

export default router;
