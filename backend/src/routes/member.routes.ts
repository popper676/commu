import { Router } from 'express';
import * as memberController from '../controllers/member.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router({ mergeParams: true }); // To access :communityId from parent router

// Member Management
router.get('/', authenticate, memberController.getMembers);
router.get('/:memberId', authenticate, memberController.getMember);
router.put('/:memberId/role', authenticate, memberController.updateMemberRole);
router.put('/:memberId/permissions', authenticate, memberController.updateMemberPermissions);
router.delete('/:memberId', authenticate, memberController.removeMember);

// Member Restrictions
router.post('/:memberId/ban', authenticate, memberController.banMember);
router.post('/:memberId/unban', authenticate, memberController.unbanMember);
router.post('/:memberId/mute', authenticate, memberController.muteMember);
router.post('/:memberId/unmute', authenticate, memberController.unmuteMember);

// Invite Members
router.post('/invite', authenticate, memberController.inviteMembers);

export default router;
