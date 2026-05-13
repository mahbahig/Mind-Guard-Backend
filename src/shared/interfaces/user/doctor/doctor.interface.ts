import { Types } from 'mongoose';

export interface DoctorInRequest {
  _id: Types.ObjectId;
  sessionTime: string;
  specialization: string;
  clinicAddress: string;
  yearsOfExperience: number;
}
