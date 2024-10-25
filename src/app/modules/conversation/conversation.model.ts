import { model, Schema } from 'mongoose';
import { TConversation } from './conversation.interface';

const conversationSchema = new Schema<TConversation>({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  messages: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    default: [],
  },
});

export const Conversation = model<TConversation>(
  'Conversation',
  conversationSchema,
);
