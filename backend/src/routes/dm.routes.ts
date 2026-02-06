import { Router } from 'express';
import * as dmController from '../controllers/dm.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Direct Message Conversations
router.get('/conversations', authenticate, dmController.getConversations);
router.get('/conversations/:userId', authenticate, dmController.getOrCreateConversation);
router.get('/conversations/:conversationId/messages', authenticate, dmController.getMessages);

// Send & Manage Messages
router.post('/conversations/:conversationId/messages', authenticate, dmController.sendMessage);
router.put('/:messageId', authenticate, dmController.editMessage);
router.delete('/:messageId', authenticate, dmController.deleteMessage);
router.post('/:messageId/read', authenticate, dmController.markAsRead);

export default router;
