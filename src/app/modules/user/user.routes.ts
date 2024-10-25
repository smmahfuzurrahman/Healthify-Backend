import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Auth/auth.constant';
import { UserControllers } from './user.controller';

const router = Router();

router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUsers);
router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getUserProfile,
);
router.put(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.updateUserProfile,
);

router.put('/:userId', auth(USER_ROLE.admin), UserControllers.promoteUser);

router.get('/activities',  UserControllers.getUserActivities)
export const UserRoutes = router;

