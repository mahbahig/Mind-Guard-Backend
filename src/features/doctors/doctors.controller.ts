import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { Roles, User } from '@common/decorators';
import { UserRole } from '@shared/enums';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import type { DoctorInRequest } from '@shared/interfaces';
import { CreateSessionSlotsDto } from './dto';

@Controller('doctors')
@Roles([UserRole.DOCTOR])
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get()
  getAllDoctors() {
    return this.doctorsService.getAllDoctors();
  }

  @Get(':id')
  getDoctor(@Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.doctorsService.getDoctor(id);
  }

  @Post()
  createSessionSlots(@User() doctor: DoctorInRequest, @Body() createSessionSlotsDto: CreateSessionSlotsDto) {
    return this.doctorsService.createSessionSlots(doctor._id, createSessionSlotsDto);
  }
}
