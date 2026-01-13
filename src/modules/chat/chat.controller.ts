import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { AuthGuard } from '@common/guards';
import { Types } from 'mongoose';
import type { RequestWithUser } from '@shared/interfaces';

@Controller('chat')
@UseGuards(AuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  createChat(@Req() req: RequestWithUser) {
    return this.chatService.createChat(req.user._id);
  }

  @Get()
  getAllChats(@Req() req: RequestWithUser) {
    return this.chatService.getAllChats(req.user._id);
  }

  @Get(':chatId')
  getChatMessages(@Param('chatId') chatId: Types.ObjectId) {
    return this.chatService.getChatMessages(chatId);
  }

  @Delete(':chatId')
  deleteChat(@Param('chatId') chatId: Types.ObjectId) {
    return this.chatService.deleteChat(chatId);
  }

  @Delete(':userId')
  deleteAllUserChats(@Req() req: RequestWithUser) {
    return this.chatService.deleteAllUserChats(req.user._id);
  }
}
