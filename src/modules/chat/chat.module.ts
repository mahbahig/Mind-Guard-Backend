import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatRepository, MessageRepository } from '@db/repositories';
import { ChatsGateway } from '@socket/chats/chats.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema, Message, MessageSchema } from '@db/schemas';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '@modules/user';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService, JwtService, ChatRepository, MessageRepository, ChatsGateway],
  exports: [ChatService, ChatRepository, MessageRepository, ChatsGateway],
})
export class ChatModule {}
