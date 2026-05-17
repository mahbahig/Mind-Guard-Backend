import { Module } from "@nestjs/common";
import { ChatsGateway } from "./gateways";
import { ChatModule } from "@modules/chat";

@Module({
  imports: [ChatModule],
  providers: [ChatsGateway],
  exports: [ChatsGateway],
})
export class SocketModule {}