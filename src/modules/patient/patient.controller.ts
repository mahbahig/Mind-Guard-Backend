import { Controller, Get, Headers, Param, Req, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { AuthGuard, RolesGuard } from '@common/guards';
import { Roles } from '@common/decorators';
import { UserRole } from '@shared/enums';
import type { RequestWithUser } from '@shared/interfaces';

@Controller('patient')
@Roles([UserRole.PATIENT])
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get('hrv-readings/:time')
  getHrvReadings(@Param('time') time: string) {
    return this.patientService.getHrvReadings(time);
  }
}
