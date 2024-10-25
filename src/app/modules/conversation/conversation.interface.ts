import { Types } from 'mongoose';

export type TConversation = {
  title: string
  userId: Types.ObjectId;
  messages?: Types.ObjectId[];
};

