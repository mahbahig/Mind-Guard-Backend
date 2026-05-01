import { UserGender, UserRole } from '@shared/enums';
import { Types } from 'mongoose';

export class UserEntity {
  readonly _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  gender: UserGender;
  dateOfBirth: Date;
  role: UserRole;
}
