import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.routes';
import { ConversationRoutes } from '../modules/conversation/conversation.routes';
import { MessageRoutes } from '../modules/message/message.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { MedicineRoutes } from '../modules/medicine/medicine.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/messages',
    route: MessageRoutes,
  },
  {
    path: '/conversations',
    route: ConversationRoutes,
  },
  {
    path: '/medicines',
    route: MedicineRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
