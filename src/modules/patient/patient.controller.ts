import { Controller, Get, Param } from '@nestjs/common';
import { PatientService } from './patient.service';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get('doctor/:id')
  getDoctorPatients(@Param('id', ParseObjectIdPipe) doctorId: Types.ObjectId) {
    return this.patientService.getDoctorPatients(doctorId);
  }
}
