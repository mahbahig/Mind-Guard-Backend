import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CHAT_MODEL_NAME, ChatSchema, MESSAGE_MODEL_NAME, MessageSchema } from './schemas';
import { ChatsRepository, MessagesRepository } from './repositories';
import { UsersModule } from '@features/users';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CHAT_MODEL_NAME, schema: ChatSchema },
      { name: MESSAGE_MODEL_NAME, schema: MessageSchema },
    ]),
    UsersModule,
  ],
  controllers: [ChatsController],
  providers: [ChatsService, ChatsRepository, MessagesRepository],
  exports: [ChatsService],
})
export class ChatsModule {}
