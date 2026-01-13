import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chat } from '@db/schemas';

@Injectable()
export class ChatRepository extends AbstractRepository<Chat> {
  constructor(@InjectModel(Chat.name) private readonly chatModel: Model<Chat>) {
    super(chatModel);
  }

  async saveChatContext(chatId: Types.ObjectId, context: string) {
    return await this.updateOne({ _id: chatId }, { context });
  }

  async getAllChatsByUserId(userId: Types.ObjectId) {
    return await this.chatModel.find({ userId });
  }

  async deleteChatById(chatId: Types.ObjectId) {
    return await this.deleteOne({ _id: chatId });
  }

  async deleteChatsByUserId(userId: Types.ObjectId) {
    return await this.chatModel.deleteMany({ userId });
  }
}
