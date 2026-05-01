import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../abstract.repository';
import { User } from '@db/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType, QueryOptions, Types } from 'mongoose';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }

  async findByEmail(email: string, projection?: ProjectionType<User>, options?: QueryOptions<User>) {
    return await this.userModel.findOne({ email }, projection, options);
  }

  async exists(email: string) {
    return await this.findByEmail(email);
  }
}
