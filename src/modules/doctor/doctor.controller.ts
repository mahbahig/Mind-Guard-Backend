import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { Roles } from '@common/decorators';
import { UserRole } from '@shared/enums';

@Controller('doctor')
@Roles([UserRole.DOCTOR])
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}
}
