import { Controller, Get, Param } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { Roles } from '@common/decorators';
import { UserRole } from '@shared/enums';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import { Types } from 'mongoose';

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
}
