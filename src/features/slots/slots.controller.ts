import { Controller, Get, Post, Body, Param, Delete, Query, ParseEnumPipe } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { CreateSlotDto } from './dto';
import { Doctor, User } from '@common/decorators';
import { SlotStatus } from '@shared/enums';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { FindAllOptionsDto } from '@common/dtos';

@Controller('slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Post()
  createEmptySlot(@Doctor('_id') doctorId: Types.ObjectId, @Body() createSlotDto: CreateSlotDto) {
    return this.slotsService.createEmptySlot(doctorId, createSlotDto);
  }

  @Get('my')
  doctorGetOwnSlots(
    @Doctor('_id') doctorId: Types.ObjectId,
    @Query() query: FindAllOptionsDto,
    @Query('status', new ParseEnumPipe(SlotStatus, { optional: true })) status?: SlotStatus,
  ) {
    return this.slotsService.doctorGetOwnSlots(doctorId, query, status);
  }

  @Get('doctor/:id')
  getDoctorFreeSlots(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.slotsService.getDoctorFreeSlots(id);
  }

  @Get(':id')
  getSlot(@User('_id') userId: Types.ObjectId, @Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.slotsService.getSlot(userId, id);
  }

  @Delete(':id')
  deleteSlot(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.slotsService.deleteSlot(id);
  }
}
