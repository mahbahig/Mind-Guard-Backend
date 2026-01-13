import { ChatService } from '@modules/chat/chat.service';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  namespace: '/chats',
  cors: '*',
})
export class ChatsGateway {
  constructor(private readonly chatService: ChatService) {}
  @SubscribeMessage('userMessage')
  async handleMessage(@MessageBody() message: any, @ConnectedSocket() client: Socket) {
    const botResponse = await this.chatService.handleUserMessage(message.chatId, message.content);
    client.emit('botMessage', { text: botResponse });
  }
}
