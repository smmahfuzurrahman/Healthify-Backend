import { Router } from 'express';
import { ConversationControllers } from './conversation.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Auth/auth.constant';

const router = Router();

router.get(
  '/:userId',
  auth(USER_ROLE.user),
  ConversationControllers.getUserConversation,
);
router.get(
  '/c/:id',
  auth(USER_ROLE.user),
  ConversationControllers.getSingleConversation,
);
router.post('/', ConversationControllers.createConversation);
router.put('/:id', ConversationControllers.updateConversation);

export const ConversationRoutes = router;
