import { Module } from '@nestjs/common';
import { AuthModule } from './auth';
import { PatientsModule } from './patients';
import { SocketModule } from './socket';
import { SlotsModule } from './slots';
import { ReadingsModule } from './readings';
import { UsersModule } from './users';
import { DoctorsModule } from './doctors';
import { ChatsModule } from './chats';

const modules = [AuthModule, UsersModule, PatientsModule, ChatsModule, DoctorsModule, ReadingsModule, SlotsModule, SocketModule];

@Module({
  imports: modules,
  exports: modules,
})
export class FeaturesModule {}
