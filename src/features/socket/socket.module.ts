import { Module } from "@nestjs/common";
import { ChatsGateway } from "./gateways";
import { ChatsModule } from "@features/chats";

@Module({
  imports: [ChatsModule],
  providers: [ChatsGateway],
  exports: [ChatsGateway],
})
export class SocketModule {}