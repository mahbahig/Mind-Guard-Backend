import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Types } from 'mongoose';
import type { RequestWithUser } from '@shared/interfaces';

@Controller('chat')
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
  getChatMessages(@Req() req: RequestWithUser, @Param('chatId') chatId: Types.ObjectId) {
    return this.chatService.getChatMessages(req.user._id, chatId);
  }

  @Delete(':chatId')
  deleteChat(@Req() req: RequestWithUser, @Param('chatId') chatId: Types.ObjectId) {
    return this.chatService.deleteChat(req.user._id, chatId);
  }

  @Delete(':userId')
  deleteAllUserChats(@Req() req: RequestWithUser) {
    return this.chatService.deleteAllUserChats(req.user._id);
  }
}
