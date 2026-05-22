import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Types } from 'mongoose';
import type { RequestWithUser } from '@shared/interfaces';

@Controller('chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Post()
  createChat(@Req() req: RequestWithUser) {
    return this.chatsService.createChat(req.user._id);
  }

  @Get()
  getAllChats(@Req() req: RequestWithUser) {
    return this.chatsService.getAllChats(req.user._id);
  }

  @Get(':chatId')
  getChatMessages(@Req() req: RequestWithUser, @Param('chatId') chatId: Types.ObjectId) {
    return this.chatsService.getChatMessages(req.user._id, chatId);
  }

  @Delete(':chatId')
  deleteChat(@Req() req: RequestWithUser, @Param('chatId') chatId: Types.ObjectId) {
    return this.chatsService.deleteChat(req.user._id, chatId);
  }

  @Delete(':userId')
  deleteAllUserChats(@Req() req: RequestWithUser) {
    return this.chatsService.deleteAllUserChats(req.user._id);
  }
}
