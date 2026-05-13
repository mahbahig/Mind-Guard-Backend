import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Roles, User } from '@common/decorators';
import { UserRole } from '@shared/enums';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import type { UserInToken } from '@shared/interfaces';
import { CreateSessionSlotsDto } from './dto';

@Controller('doctor')
@Roles([UserRole.DOCTOR])
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get()
  getAllDoctors() {
    return this.doctorService.getAllDoctors();
  }

  @Get(':id')
  getDoctor(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.doctorService.getDoctor(id);
  }

  @Post()
  createSessionSlots(@User() doctor: UserInToken, @Body() createSessionSlotsDto: CreateSessionSlotsDto) {
    return this.doctorService.createSessionSlots(doctor._id, createSessionSlotsDto);
  }
}
