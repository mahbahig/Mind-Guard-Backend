import { UserGender, UserRole } from '@shared/enums';
import { Types } from 'mongoose';

export interface BaseUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  gender: UserGender;
  dateOfBirth: Date;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
