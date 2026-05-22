import { BaseRepository } from '@database';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chat, CHAT_MODEL_NAME, ChatDocument } from '../schemas';

@Injectable()
export class ChatsRepository extends BaseRepository<Chat> {
  constructor(@InjectModel(CHAT_MODEL_NAME) private readonly chatModel: Model<ChatDocument>) {
    super(chatModel);
  }

  saveChatContext(chatId: Types.ObjectId, context: string) {
    return this.updateOne({ _id: chatId }, { context });
  }

  getAllChatsByUserId(userId: Types.ObjectId) {
    return this.chatModel.find({ userId });
  }

  deleteChatById(chatId: Types.ObjectId) {
    return this.deleteOne({ _id: chatId });
  }

  deleteChatsByUserId(userId: Types.ObjectId) {
    return this.chatModel.deleteMany({ userId });
  }
}
