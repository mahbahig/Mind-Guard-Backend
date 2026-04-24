import { UserGender } from '@shared/enums';
import { Types } from 'mongoose';

export abstract class UserEntity {
  readonly _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  gender: UserGender;
  dateOfBirth: Date;
}
