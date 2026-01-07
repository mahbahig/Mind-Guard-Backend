import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { AuthGuard } from '@common/guards';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return { success: true, message: 'Testing Guards' };
  }
}
