import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType, QueryOptions } from 'mongoose';
import { BaseRepository } from '@database';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
    super(userModel);
  }

  async findByEmail(email: string, projection?: ProjectionType<User>, options?: QueryOptions<User>) {
    return await this.userModel.findOne({ email }, projection, options);
  }

  async exists(email: string) {
    return await this.findByEmail(email);
  }
}
