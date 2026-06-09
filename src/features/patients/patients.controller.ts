import { Controller, Get } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { Types } from 'mongoose';
import { Doctor, Roles } from '@common/decorators';
import { UserRole } from '@shared';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Roles([UserRole.DOCTOR])
  @Get('doctor/:id')
  getDoctorPatients(@Doctor('_id') doctorId: Types.ObjectId) {
    return this.patientsService.getDoctorPatients(doctorId);
  }
}
