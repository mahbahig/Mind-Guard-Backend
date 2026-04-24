import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { UserMongoModule } from '@common/modules';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserMongoModule],
  controllers: [DoctorController],
  providers: [DoctorService, JwtService],
})
export class DoctorModule {}
