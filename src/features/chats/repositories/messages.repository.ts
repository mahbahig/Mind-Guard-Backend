import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MessageSender } from '@shared/enums';
import { BaseRepository } from '@database';
import { Message, MESSAGE_MODEL_NAME, MessageDocument } from '../schemas';

@Injectable()
export class MessagesRepository extends BaseRepository<Message> {
  constructor(@InjectModel(MESSAGE_MODEL_NAME) private readonly messageModel: Model<MessageDocument>) {
    super(messageModel);
  }

  getAllChatMessages(chat: Types.ObjectId) {
    return this.messageModel.find({ chat }).sort({ createdAt: 1 });
  }

  saveUserMessage(chat: Types.ObjectId, content: string) {
    return this.create({ chat, isSenderUser: true, content });
  }

  saveBotResponse(chat: Types.ObjectId, content: string) {
    return this.create({ chat, isSenderUser: false, content });
  }

  deleteChatMessages(chat: Types.ObjectId) {
    return this.messageModel.deleteMany({ chat });
  }
}
