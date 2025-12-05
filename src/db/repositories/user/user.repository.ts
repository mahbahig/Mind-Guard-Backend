import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../abstract.repository';
import { User } from '@db/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
    super(userModel);
  }

  async exists(email: string) {
    return await this.findByEmail(email);
  }
}
