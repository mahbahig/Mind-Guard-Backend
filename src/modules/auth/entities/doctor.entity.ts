import { Types } from 'mongoose';

export class DoctorEntity {
  _id: Types.ObjectId;
  specialization: string;
  yearsOfExperience: number;
}
