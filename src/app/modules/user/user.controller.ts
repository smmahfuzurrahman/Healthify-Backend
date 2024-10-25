import { Response, Request } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { UserServices } from './user.service';

// retrieve all the users from database
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

// get single user profile info from database
const getUserProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const result = await UserServices.getUserProfileFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User info retrieved successfully',
    data: result,
  });
});

// update user profile from database
const updateUserProfile = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user;
  const payload = req.body;
  const result = await UserServices.updateUserProfileFromDB(userId, payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User info updated successfully',
    data: result,
  });
});

const promoteUser = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await UserServices.promoteUserFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User promoted successfully',
    data: result,
  });
});

const getUserActivities = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUserActivitiesFrom();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User activities fetched successfully',
    data: result,
  });
});
export const UserControllers = {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  promoteUser,
  getUserActivities
};
