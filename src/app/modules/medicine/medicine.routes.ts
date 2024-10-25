import { Router } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Auth/auth.constant';
import { MedicineControllers } from './medicine.controller';

const router = Router();

router.post('/', auth(USER_ROLE.user), MedicineControllers.addMedicine);
router.get('/', auth(USER_ROLE.user), MedicineControllers.getUserMedicines);
router.delete(
  '/:id',
  auth(USER_ROLE.user),
  MedicineControllers.removeUserMedicines,
);

export const MedicineRoutes = router;
