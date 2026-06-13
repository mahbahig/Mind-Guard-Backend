import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { Roles, User } from '@common/decorators';
import { UserRole } from '@shared/enums';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import type { DoctorInRequest } from '@shared/interfaces';
import { CreateSessionSlotsDto } from './dto';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  @Roles([UserRole.DOCTOR, UserRole.PATIENT])
  getAllDoctors() {
    return this.doctorsService.getAllDoctors();
  }

  @Get(':id')
  @Roles([UserRole.DOCTOR, UserRole.PATIENT])
  getDoctor(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.doctorsService.getDoctor(id);
  }

  @Post()
  @Roles([UserRole.DOCTOR])
  createSessionSlots(@User() doctor: DoctorInRequest, @Body() createSessionSlotsDto: CreateSessionSlotsDto) {
    return this.doctorsService.createSessionSlots(doctor._id, createSessionSlotsDto);
  }
}
