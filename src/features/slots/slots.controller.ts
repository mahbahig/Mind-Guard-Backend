import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseEnumPipe } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { CreateSlotDto, UpdateSlotDto } from './dto';
import { Doctor, Roles, User } from '@common/decorators';
import type { DoctorInRequest, UserInRequest } from '@shared/interfaces';
import { SlotStatus, UserRole } from '@shared/enums';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { FindAllOptionsDto } from '@common/dtos';

@Controller(['slots', 'slot'])
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Post()
  @Roles([UserRole.DOCTOR])
  createEmptySlot(@Doctor() doctor: DoctorInRequest, @Body() createSlotDto: CreateSlotDto) {
    return this.slotsService.createEmptySlot(doctor, createSlotDto);
  }

  @Get('my')
  @Roles([UserRole.DOCTOR])
  getDoctorSlots(
    @Doctor() doctor: DoctorInRequest,
    @Query() query: FindAllOptionsDto,
    @Query('status', new ParseEnumPipe(SlotStatus, { optional: true })) status?: SlotStatus,
  ) {
    return this.slotsService.getDoctorSlots(doctor._id, query, status);
  }

  @Get('doctor/:id')
  @Roles([UserRole.DOCTOR, UserRole.PATIENT])
  getDoctorAvailableSlots(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @Query() query: FindAllOptionsDto,
    @Query('status', new ParseEnumPipe(SlotStatus, { optional: true })) status?: SlotStatus,
  ) {
    return this.slotsService.getDoctorAvailableSlots(id, query, status);
  }

  @Get('patient/my')
  @Roles([UserRole.PATIENT])
  getPatientSlots(@User() user: UserInRequest) {
    return this.slotsService.getPatientSlots(user._id);
  }

  @Get(':id')
  @Roles([UserRole.DOCTOR, UserRole.PATIENT])
  getSlot(@User() user: UserInRequest, @Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.slotsService.getSlot(user, id);
  }

  @Patch(':id')
  @Roles([UserRole.DOCTOR, UserRole.PATIENT])
  update(@User() user: UserInRequest, @Param('id', ParseObjectIdPipe) id: Types.ObjectId, @Body() updateSlotDto: UpdateSlotDto) {
    return this.slotsService.update(user, id, updateSlotDto);
  }

  @Delete(':id')
  @Roles([UserRole.DOCTOR])
  remove(@Doctor() doctor: DoctorInRequest, @Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.slotsService.remove(doctor._id, id);
  }
}
