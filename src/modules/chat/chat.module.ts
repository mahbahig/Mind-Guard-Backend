import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatRepository, MessageRepository } from '@db/repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatSchema, MessageSchema } from '@db/schemas';
import { UserModule } from '@modules/user';
import { ModelName } from '@shared/enums';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ModelName.CHAT, schema: ChatSchema },
      { name: ModelName.MESSAGE, schema: MessageSchema },
    ]),
    UserModule,
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatRepository, MessageRepository],
  exports: [ChatService, ChatRepository, MessageRepository],
})
export class ChatModule {}
