import { Router } from 'express';
import * as fileController from '../controllers/file.controller';
import { authenticate } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';

const router = Router();

// Protect all file routes
router.use(authenticate);

// Upload single file
router.post('/upload', upload.single('file'), fileController.uploadFile);

// Delete file
router.delete('/:id', fileController.deleteFile);

export default router;
