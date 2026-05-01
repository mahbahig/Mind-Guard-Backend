import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TitleCasePipe } from '@common/pipes';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '@db/repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@db/schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, TitleCasePipe, JwtService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
