import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TitleCasePipe } from '@common/pipes';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '@features/users';
import { HashingService } from '@shared';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService, TitleCasePipe, JwtService, HashingService],
  exports: [AuthService, JwtService],
})
export class AuthModule {}
