import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from './user.model';
import { TUser } from './user.interface';
import { getToken } from '../../utils/getToken';

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

const getUserProfileFromDB = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  return user;
};

const updateUserProfileFromDB = async (userId: string, payload: TUser) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const fields = [
    'name',
    'email',
    'phone',
    'age',
    'address',
    'isDiabetes',
    'gender',
    'bloodGroup',
  ];

  // Check if the fields exist and are not undefined
  const completedFields = fields.filter((field) => {
    const value = payload[field as keyof TUser];
    return value !== undefined && value !== null; // Count if value is not undefined or null
  }).length;

  const profileCompleteStatus = (completedFields / fields.length) * 100;

  // sending a new token

  const updatedData = {
    ...payload,
    profileCompleteStatus,
  };

  const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
    new: true,
  });

  const jwtPayload = {
    userId: user?._id,
    role: user?.role,
    status: profileCompleteStatus,
  };
  const token = getToken(jwtPayload);

  return {
    updatedUser,
    token,
  };
};

const promoteUserFromDB = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { role: 'admin' },
    { new: true },
  );
  return updatedUser;
};

const deleteUserFromDB = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const deletedUser = await User.findByIdAndDelete(userId);
  return deletedUser;
};

const getUserActivitiesFrom = async () => {
  const users = await User.find({}).sort({
    createdAt: -1,
  });
  const profileCompletedUsers = await User.find({
    profileCompleteStatus: { $eq: 100 },
  });

  const totalPercentageOfCompleted =
    (profileCompletedUsers.length / users.length) * 100;

  return {
    totalPercentageOfCompleted,
    users,
  };
};
export const UserServices = {
  getAllUsersFromDB,
  getUserProfileFromDB,
  updateUserProfileFromDB,
  promoteUserFromDB,
  deleteUserFromDB,
  getUserActivitiesFrom,
};
