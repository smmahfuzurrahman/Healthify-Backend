import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TMessage } from './message.interface';
import { Message } from './message.model';

const createMessageIntoDB = async (payload: TMessage) => {
  const isUserExist = await User.findById(payload.userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await Message.create(payload);
  return result;
};

export const MessageServices = {
  createMessageIntoDB,
};
