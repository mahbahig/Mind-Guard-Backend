import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { UserMongoModule } from '@common/modules';
import { ChatRepository, MessageRepository } from '@db/repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { Chat, ChatSchema, Message, MessageSchema } from '@db/schemas';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UserMongoModule,
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: Message.name, schema: MessageSchema },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService, JwtService, ChatRepository, MessageRepository],
})
export class ChatModule {}
