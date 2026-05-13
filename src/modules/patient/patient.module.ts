import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientSchema } from '@db/schemas';
import { PatientRepository } from '@db/repositories';
import { ModelName } from '@shared/enums';

@Module({
  imports: [MongooseModule.forFeature([{ name: ModelName.PATIENT, schema: PatientSchema }])],
  controllers: [PatientController],
  providers: [PatientService, JwtService, PatientRepository],
  exports: [PatientService, PatientRepository],
})
export class PatientModule {}
