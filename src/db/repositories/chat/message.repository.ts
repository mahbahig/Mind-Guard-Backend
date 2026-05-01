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

  getAllChatMessages(chat: Types.ObjectId) {
    return this.messageModel.find({ chat }).sort({ createdAt: 1 });
  }

  saveUserMessage(chat: Types.ObjectId, content: string) {
    return this.create({ chat, sender: MessageSender.USER, content });
  }

  saveBotMessage(chat: Types.ObjectId, content: string) {
    return this.create({ chat, sender: MessageSender.BOT, content });
  }

  deleteChatMessages(chat: Types.ObjectId) {
    return this.messageModel.deleteMany({ chat });
  }
}
