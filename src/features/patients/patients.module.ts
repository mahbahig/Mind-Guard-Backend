import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientsRepository } from './patients.repository';
import { PATIENT_MODEL_NAME, PatientSchema } from './patient.schema';
import { USER_MODEL_NAME, UserSchema } from '@features/users/user.schema';
import { READING_MODEL_NAME, ReadingSchema } from '@features/readings/reading.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PATIENT_MODEL_NAME, schema: PatientSchema },
      { name: USER_MODEL_NAME, schema: UserSchema },
      { name: READING_MODEL_NAME, schema: ReadingSchema },
    ]),
  ],
  controllers: [PatientsController],
  providers: [PatientsService, JwtService, PatientsRepository],
  exports: [PatientsService, PatientsRepository],
})
export class PatientsModule {}
