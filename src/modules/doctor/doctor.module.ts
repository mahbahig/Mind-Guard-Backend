import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '@modules/user';
import { DoctorRepository } from '@db/repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from '@db/schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }]), UserModule],
  controllers: [DoctorController],
  providers: [DoctorService, JwtService, DoctorRepository],
  exports: [DoctorService, DoctorRepository],
})
export class DoctorModule {}
