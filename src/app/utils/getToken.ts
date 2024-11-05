import jwt from 'jsonwebtoken';
import config from '../config';
import { Types } from 'mongoose';
import { TRole } from '../modules/user/user.interface';
export const getToken = (payload: {
  userId: Types.ObjectId;
  role: TRole | undefined;
  status: number | undefined;
}) => {
  const jwtPayload = {
    userId: payload.userId,
    role: payload.role,
    status: payload.status,
  };
  const token = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '30d',
  });
  return token;
};
