import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../abstract.repository';
import { Message } from '@db/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MessageSender } from '@shared/enums';

@Injectable()
export class MessageRepository extends AbstractRepository<Message> {
  constructor(@InjectModel(Message.name) private readonly messageModel: Model<Message>) {
    super(messageModel);
  }

  async getAllMessagesByChatId(chatId: Types.ObjectId) {
    return await this.messageModel.find({ chatId }).sort({ createdAt: 1 });
  }

  async saveUserMessage(chatId: Types.ObjectId, content: string) {
    return await this.create({ chatId, sender: MessageSender.USER, content });
  }

  async saveBotMessage(chatId: Types.ObjectId, content: string) {
    return await this.create({ chatId, sender: MessageSender.BOT, content });
  }

  async deleteMessagesByChatId(chatId: Types.ObjectId) {
    return await this.messageModel.deleteMany({ chatId });
  }
}
