import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseEnumPipe } from '@nestjs/common';
import { SlotService } from './slot.service';
import { CreateSlotDto, UpdateSlotDto } from './dto';
import { Doctor, User } from '@common/decorators';
import type { DoctorInRequest, UserInRequest } from '@shared/interfaces';
import { SlotStatus } from '@shared/enums';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { FindAllOptionsDto } from '@common/dtos';

@Controller('slot')
export class SlotController {
  constructor(private readonly slotService: SlotService) {}

  @Post()
  createEmptySlot(@Doctor() doctor: DoctorInRequest, @Body() createSlotDto: CreateSlotDto) {
    return this.slotService.createEmptySlot(doctor, createSlotDto);
  }

  @Get('my')
  getDoctorSlots(
    @Doctor() doctor: DoctorInRequest,
    @Query() query: FindAllOptionsDto,
    @Query('status', new ParseEnumPipe(SlotStatus, { optional: true })) status?: SlotStatus,
  ) {
    return this.slotService.getDoctorSlots(doctor._id, query, status);
  }

  @Get(':id')
  getSlot(@User() user: UserInRequest, @Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.slotService.getSlot(user._id, id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSlotDto: UpdateSlotDto) {
    return this.slotService.update(+id, updateSlotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.slotService.remove(+id);
  }
}
