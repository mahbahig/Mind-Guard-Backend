import { UserRole } from '@shared/enums';
import { Request } from 'express';
import { Types } from 'mongoose';

export interface RequestWithUser extends Request {
  user: {
    _id: Types.ObjectId;
    name: string;
    email: string;
    role: UserRole;
  };
}
