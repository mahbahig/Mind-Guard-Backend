import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientsRepository } from './patients.repository';
import { PATIENT_MODEL_NAME, PatientSchema } from './patient.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: PATIENT_MODEL_NAME, schema: PatientSchema }])],
  controllers: [PatientsController],
  providers: [PatientsService, JwtService, PatientsRepository],
  exports: [PatientsService, PatientsRepository],
})
export class PatientsModule {}
