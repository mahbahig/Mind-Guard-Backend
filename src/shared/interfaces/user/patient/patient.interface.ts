import { Types } from 'mongoose';

export interface PatientInRequest {
  _id: Types.ObjectId;
  diagnosis: string;
  medicalHistory: string;
  currentMedications: string;
  treatingDoctor: Types.ObjectId;
}
