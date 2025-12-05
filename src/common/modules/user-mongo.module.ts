import { DoctorRepository, PatientRepository, UserRepository } from '@db/repositories';
import { Doctor, DoctorSchema, Patient, PatientSchema, User, UserSchema } from '@db/schemas';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        discriminators: [
          { name: Doctor.name, schema: DoctorSchema },
          { name: Patient.name, schema: PatientSchema },
        ],
      },
    ]),
  ],
  providers: [DoctorRepository, PatientRepository, UserRepository],
  exports: [DoctorRepository, PatientRepository, UserRepository],
})
export class UserMongoModule {}
