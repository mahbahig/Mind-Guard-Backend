import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TitleCasePipe } from '@common/pipes';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersFactory } from './users.factory';
import { USER_MODEL_NAME, UserSchema } from './user.schema';
import { UsersRepository } from './users.repository';
import { DoctorsModule } from '@features/doctors';
import { PatientsModule } from '@features/patients';
import { HashingService } from '@shared';

@Module({
  imports: [MongooseModule.forFeature([{ name: USER_MODEL_NAME, schema: UserSchema }]), PatientsModule, DoctorsModule],
  controllers: [UsersController],
  providers: [UsersService, TitleCasePipe, JwtService, UsersRepository, UsersFactory, HashingService],
  exports: [UsersService],
})
export class UsersModule {}
