import { Router } from 'express';
import { ReportControllers } from './report.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Auth/auth.constant';

const router = Router();

router.post('/', auth(USER_ROLE.user), ReportControllers.addReport);
router.get('/', auth(USER_ROLE.user), ReportControllers.getReports);
router.get('/:id', auth(USER_ROLE.user), ReportControllers.getSingleReport);
router.delete('/:id', ReportControllers.deleteReport);

export const ReportRoutes = router;
