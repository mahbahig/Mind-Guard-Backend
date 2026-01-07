import { UserGender, UserRole } from '@shared/enums';
import { Types } from 'mongoose';

export interface SafeUser {
  _id: Types.ObjectId;
  name: string;
  email: string;
  gender: UserGender;
  dateOfBirth: Date;
  role: UserRole;
}
