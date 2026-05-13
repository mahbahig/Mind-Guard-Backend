import { UserRole } from '@shared/enums';
import { Request } from 'express';
import { Types } from 'mongoose';
import { DoctorInRequest, PatientInRequest } from '../user';

export interface UserInRequest {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role: UserRole;
}
export interface RequestWithUser extends Request {
  user: UserInRequest;
}
export interface RequestWithDoctor extends RequestWithUser {
  doctor: DoctorInRequest;
}
export interface RequestWithPatient extends RequestWithUser {
  patient: PatientInRequest;
}
