import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthFactory } from './factory/auth.factory';
import { TitleCasePipe } from '@common/pipes';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '@modules/user/user.module';
import { PatientModule } from '@modules/patient';
import { DoctorModule } from '@modules/doctor';

@Module({
  imports: [UserModule, PatientModule, DoctorModule],
  controllers: [AuthController],
  providers: [AuthService, AuthFactory, TitleCasePipe, JwtService],
})
export class AuthModule {}
