import { Router } from 'express';
import * as challengeController from '../controllers/challenge.controller';
import { authenticate, authenticateOptional } from '../middleware/auth.middleware';
import { upload } from '../middleware/upload.middleware';

const router = Router();

// Challenges
router.get('/', authenticateOptional, challengeController.getChallenges);
router.post('/', authenticate, challengeController.createChallenge);
router.get('/:id', authenticateOptional, challengeController.getChallenge);
router.put('/:id', authenticate, challengeController.updateChallenge);
router.delete('/:id', authenticate, challengeController.deleteChallenge);

// Submissions
router.get('/:id/submissions', authenticateOptional, challengeController.getSubmissions);
router.post(
    '/:id/submissions',
    authenticate,
    upload.array('files', 5),
    challengeController.createSubmission
);
router.put('/:id/submissions/:submissionId', authenticate, challengeController.updateSubmission);
router.delete('/:id/submissions/:submissionId', authenticate, challengeController.deleteSubmission);

// Judging (creator only)
router.post('/:id/submissions/:submissionId/score', authenticate, challengeController.scoreSubmission);

export default router;
