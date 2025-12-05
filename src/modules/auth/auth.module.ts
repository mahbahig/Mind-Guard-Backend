import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserMongoModule } from '@common/modules';
import { AuthFactory } from './factory/auth.factory';
import { TitleCasePipe } from '@common/pipes';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UserMongoModule],
  controllers: [AuthController],
  providers: [AuthService, AuthFactory, TitleCasePipe, JwtService],
})
export class AuthModule {}
