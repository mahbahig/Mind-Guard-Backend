import { ChatsService } from '@features/chats';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { SocketEvents } from '@shared/enums';
import type { IncomingMessage } from '@shared/interfaces';
import { Types } from 'mongoose';
import { Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/chats',
  cors: '*',
})
export class ChatsGateway {
  constructor(private readonly chatsService: ChatsService) {}

  // Handle incoming messages from users
  @SubscribeMessage(SocketEvents.USER_MESSAGE)
  async handleMessage(@MessageBody() message: IncomingMessage, @ConnectedSocket() client: Socket) {
    // TODO: Get real chatId
    await this.chatsService.generateResponse(new Types.ObjectId(), message.content, client);
  };
}
