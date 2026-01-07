import { Controller, Get, Headers, Req, UseGuards } from '@nestjs/common';
import { PatientService } from './patient.service';
import { AuthGuard, RolesGuard } from '@common/guards';
import { Roles } from '@common/decorators';
import { UserRole } from '@shared/enums';

@Controller('patient')
@UseGuards(AuthGuard, RolesGuard)
@Roles([UserRole.PATIENT])
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get('profile')
  getProfile(@Req() req) {
    return this.patientService.getProfile(req.user._id);
  }
}
