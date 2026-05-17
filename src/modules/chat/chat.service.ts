import { ChatRepository, MessageRepository, UserRepository } from '@db/repositories';
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SocketEvents } from '@shared/enums';
import { Types } from 'mongoose';
import { Socket } from 'socket.io';

@Injectable()
export class ChatService {
  private readonly aiUrl: string;
  constructor(
    private readonly chatRepository: ChatRepository,
    private readonly messageRepository: MessageRepository,
    private readonly configService: ConfigService,
  ) {
    this.aiUrl = this.configService.getOrThrow<string>('aiService.url');
  }
  async createChat(userId: Types.ObjectId) {
    const chat = await this.chatRepository.create({ user: userId });
    if (!chat) throw new InternalServerErrorException('Failed to create chat');
    return { message: 'Chat created successfully', chatId: chat._id };
  }

  async getAllChats(userId: Types.ObjectId) {
    const chats = await this.chatRepository.getAllChatsByUserId(userId);
    if (!chats) throw new InternalServerErrorException('Unable to retrieve chats');
    if (chats.length === 0) throw new BadRequestException('No chats found');
    return chats;
  }

  async getChatMessages(userId: Types.ObjectId, chatId: Types.ObjectId) {
    const chat = await this.chatRepository.findById(chatId);
    // Handle case where chat does not exist
    if (!chat) throw new NotFoundException('Chat not found');

    // Handle case where chat does not belong to the user
    if (chat.user != userId) throw new UnauthorizedException('You are not authorized to access this chat');

    const messages = await this.messageRepository.getAllChatMessages(chatId);
    if (!messages) throw new InternalServerErrorException('Unable to retrieve messages');
    if (messages.length === 0) throw new BadRequestException('No messages found in this chat');
    return messages;
  }

  async deleteChat(userId: Types.ObjectId, chatId: Types.ObjectId) {
    const chat = await this.chatRepository.findById(chatId);
    // Handle case where chat does not exist
    if (!chat) throw new NotFoundException('Chat not found');

    // Handle case where chat does not belong to the user
    if (chat.user != userId) throw new UnauthorizedException('You are not authorized to delete this chat');

    const deletedMessages = await this.messageRepository.deleteChatMessages(chatId);
    const deletedChat = await this.chatRepository.deleteChatById(chatId);
    if (!deletedChat) throw new NotFoundException('Chat not found');
    return { deletedMessages: deletedMessages.deletedCount, message: 'Chat and its messages deleted successfully' };
  }

  async deleteAllUserChats(userId: Types.ObjectId) {
    const deletedChats = await this.chatRepository.deleteChatsByUserId(userId);
    if (deletedChats.deletedCount === 0) throw new NotFoundException('No chats found for this user');
    return { deletedChats: deletedChats.deletedCount, message: 'All user chats deleted successfully' };
  }

  async generateResponse(chatId: Types.ObjectId, content: string, client: Socket) {
    // const chat = await this.chatRepository.findById(chatId);
    // if (!chat) throw new NotFoundException('Chat not found');

    await this.messageRepository.saveUserMessage(chatId, content);

    // TODO: GET LATEST 5 MESSAGES FROM BOTH USER AND BOT, GIVEN THE chatId. AND SEND THEM TO THE BOT FOR CONTEXT.
    // TODO: GET USER DATA FROM THE DB AND HRV DATA FROM THE DB AND SEND THEM TO THE BOT FOR CONTEXT.
    // const botResponse = `Thank you for your message. This is an automated response from the bot.`;
    const body = {
      old_messages: [],
      user_id: chatId.toString(),
      content,
    };
    const response = await fetch(`${this.aiUrl}/chat/generate`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });
    let fullText = '';

    for await (const chunk of response.body as any) {
      const text = new TextDecoder().decode(chunk);
      fullText += text;
      client.emit(SocketEvents.BOT_MESSAGE, { text });
    }
    await this.messageRepository.saveBotResponse(chatId, fullText);
  }
}
