import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { ConversationServices } from './conversation.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const getUserConversation = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await ConversationServices.getUserConversationFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Conversation list fetched successfully',
    data: result,
  });
});
const getSingleConversation = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { userId } = req.user;
    console.log(userId);
    const result = await ConversationServices.getSingleConversationFromDB(
      id,
      userId,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Message list fetched successfully',
      data: result,
    });
  },
);

const createConversation = catchAsync(async (req: Request, res: Response) => {
  const payload = req.body;
  const result = await ConversationServices.createConversationIntoDB(payload);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Conversation created successfully',
    data: result,
  });
});
const updateConversation = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { messageId } = req.body;

  const result = await ConversationServices.updateConversationFromDB(
    id,
    messageId,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Conversation list fetched successfully',
    data: result,
  });
});
export const ConversationControllers = {
  getUserConversation,
  createConversation,
  updateConversation,
  getSingleConversation,
};
