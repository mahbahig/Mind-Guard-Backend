import { Types } from 'mongoose';

export interface IncomingMessage {
  userId: Types.ObjectId;
  chatId: Types.ObjectId;
  content: string;
}
