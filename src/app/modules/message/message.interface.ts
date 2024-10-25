import { Types } from 'mongoose';

export type TMessage = {
  userId: Types.ObjectId;
  query: string;
  answer: string;
  conversationId: Types.ObjectId;
};

