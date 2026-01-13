import { ChatRepository, MessageRepository } from '@db/repositories';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly messageRepository: MessageRepository,
  ) {}
  async createChat(userId: Types.ObjectId) {
    const chat = await this.chatRepository.create({ userId });
    if (!chat) throw new InternalServerErrorException('Failed to create chat');
    return chat;
  }

  async getAllChats(userId: Types.ObjectId) {
    const chats = await this.chatRepository.getAllChatsByUserId(userId);
    if (!chats) throw new InternalServerErrorException('Unable to retrieve chats');
    if (chats.length === 0) throw new BadRequestException('No chats found');
    return chats;
  }

  async getChatMessages(chatId: Types.ObjectId) {
    const messages = await this.messageRepository.getAllMessagesByChatId(chatId);
    if (!messages) throw new InternalServerErrorException('Unable to retrieve messages');
    if (messages.length === 0) throw new BadRequestException('No messages found in this chat');
    return messages;
  }

  async deleteChat(chatId: Types.ObjectId) {
    const deletedMessages =await this.messageRepository.deleteMessagesByChatId(chatId);
    const deletedChat = await this.chatRepository.deleteChatById(chatId);
    if (!deletedChat) throw new NotFoundException('Chat not found');
    return { deletedMessages: deletedMessages.deletedCount, message: 'Chat and its messages deleted successfully'};
  }

  async deleteAllUserChats(userId: Types.ObjectId) {
    const deletedChats =  await this.chatRepository.deleteChatsByUserId(userId);
    if (deletedChats.deletedCount === 0) throw new NotFoundException('No chats found for this user');
    return { deletedChats: deletedChats.deletedCount, message: 'All user chats deleted successfully' };
  }
}
