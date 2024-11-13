import { Router } from 'express';

import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Auth/auth.constant';
import { BloodPressureControllers } from './BloodPressure.controller';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  BloodPressureControllers.addBloodPressure,
);
router.get(
  '/',
  auth(USER_ROLE.user),
  BloodPressureControllers.getBloodPressure,
);

router.delete('/:id', BloodPressureControllers.deleteBloodPressure);

export const BloodPressureRoutes = router;
