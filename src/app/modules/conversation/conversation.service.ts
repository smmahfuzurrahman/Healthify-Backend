/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TConversation } from './conversation.interface';
import { User } from '../user/user.model';
import { Conversation } from './conversation.model';

const getUserConversationFromDB = async (userId: string) => {
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await Conversation.find({
    userId,
  }).populate({
    path: 'messages',
  });
  return result;
};

const createConversationIntoDB = async (payload: TConversation) => {
  const isUserExist = await User.findById(payload.userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await Conversation.create(payload);
  return result;
};

const updateConversationFromDB = async (id: string, payload: string) => {
  const conversation = await Conversation.findById(id);
  if (!conversation) {
    throw new AppError(httpStatus.NOT_FOUND, 'Conversation not found');
  }
  const result = await Conversation.findByIdAndUpdate(
    id,
    {
      $push: { messages: payload },
    },
    {
      new: true,
    },
  );

  return result;
};

const getSingleConversationFromDB = async (id: string, userId: string) => {
  
  const user = await User.findById(userId);
  
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const conversation = await Conversation.findById(id).populate({
    path: 'messages',
  });
  if (!conversation) {
    throw new AppError(httpStatus.NOT_FOUND, 'Conversation not found');
  }
  return conversation;
};

const removeSingleConversationFromDB = async (id: string, userId: string) => {
  
  const user = await User.findById(userId);
  
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const deletedConversation = await Conversation.findByIdAndDelete(id)
  return deletedConversation;
};

export const ConversationServices = {
  getUserConversationFromDB,
  createConversationIntoDB,
  updateConversationFromDB,
  getSingleConversationFromDB,
  removeSingleConversationFromDB
};
