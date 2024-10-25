/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { TLogin } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const createUserIntoDB = async (payload: TUser) => {
  const isUserExist = await User.findOne({ email: payload?.email });

  if (isUserExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'User already exist with the same email!',
    );
  }
  const result = await User.create(payload);
  return result;
};

// login user
const loginUser = async (payload: TLogin) => {
  const user = await User.findOne({
    email: payload?.email,
  });
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid credentials');
  }
  if (user?.isDeleted) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'User is deleted');
  }
  const isValidPassword = await User.isPasswordMatched(
    payload.password,
    user?.password,
  );
  if (!isValidPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid password');
  }

  const jwtPayload = {
    userId: user._id,
    role: user?.role,
    status: user.profileCompleteStatus,
  };
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '30d',
  });
  const { password, ...restData } = user.toObject();
  return {
    token,
    restData,
  };
};
export const AuthServices = {
  createUserIntoDB,
  loginUser,
};
