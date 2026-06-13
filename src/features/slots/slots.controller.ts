import { Controller, Get, Post, Body, Param, Delete, Query, ParseEnumPipe, Patch } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { CreateSlotDto, UpdateSlotDto } from './dto';
import { Doctor, Patient, User } from '@common/decorators';
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

  @Patch(':id/assign')
  assignPatientToSlot(@Patient('_id') patientId: Types.ObjectId, @Param('id', ParseObjectIdPipe) slotId: Types.ObjectId) {
    return this.slotsService.assignPatientToSlot(slotId, patientId);
  }

  @Patch(':id/book')
  bookSlot(@Patient('_id') patientId: Types.ObjectId, @Param('id', ParseObjectIdPipe) slotId: Types.ObjectId) {
    return this.slotsService.bookSlot(slotId, patientId);
  }

  @Get('doctor/:id')
  getDoctorFreeSlots(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.slotsService.getDoctorFreeSlots(id);
  }

  @Patch(':id')
  updateSlot(@Doctor('_id') doctorId: Types.ObjectId, @Param('id', ParseObjectIdPipe) slotId: Types.ObjectId, @Body() updateSlotDto: UpdateSlotDto) {
    return this.slotsService.updateSlot(doctorId, slotId, updateSlotDto);
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
