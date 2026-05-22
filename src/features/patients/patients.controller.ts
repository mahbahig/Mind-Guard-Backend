import { Controller, Get, Param } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get('doctor/:id')
  getDoctorPatients(@Param('id', ParseObjectIdPipe) doctorId: Types.ObjectId) {
    return this.patientsService.getDoctorPatients(doctorId);
  }
}
