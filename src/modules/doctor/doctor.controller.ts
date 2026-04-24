import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req  } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { AuthGuard, RolesGuard } from '@common/guards';
import { Roles } from '@common/decorators';
import { UserRole } from '@shared/enums';
import type { RequestWithUser } from '@shared/interfaces';


@Controller('doctor')
@UseGuards(AuthGuard, RolesGuard)
@Roles([UserRole.DOCTOR])
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Get('profile')
  getProfile(@Req() req: RequestWithUser) {
    return this.doctorService.getProfile(req.user._id);
  }

}
