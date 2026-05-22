import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { DoctorsRepository } from './doctors.repository';
import { DOCTOR_MODEL_NAME, DoctorSchema } from './doctor.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: DOCTOR_MODEL_NAME, schema: DoctorSchema }])],
  controllers: [DoctorsController],
  providers: [DoctorsService, JwtService, DoctorsRepository],
  exports: [DoctorsService, DoctorsRepository],
})
export class DoctorsModule {}
