import httpStatus from 'http-status';
import { User } from '../user/user.model';

import AppError from '../../errors/AppError';
import { TBloodPressure } from './BloodPressure.interface';
import { BloodPressure } from './BloodPressure.model';

const addBloodPressureIntoDB = async (payload: TBloodPressure) => {
  const isUserExist = await User.findById(payload.userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await BloodPressure.create(payload);
  return result;
};

const getBloodPressuresFromDB = async (userId: string) => {
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await BloodPressure.find({
    userId,
  });
  return result;
};

const deleteBloodPressureFromDB = async (id: string) => {
  const isBloodPressure = await BloodPressure.findById(id);
  if (!isBloodPressure) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blood Pressure not found');
  }
  const result = await BloodPressure.findByIdAndDelete(id);
  return result;
};

export const BloodPressureServices = {
  addBloodPressureIntoDB,
  getBloodPressuresFromDB,
  deleteBloodPressureFromDB,
};
