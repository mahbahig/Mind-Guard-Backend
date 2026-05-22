import { DOCTOR_MODEL_NAME } from '@features/doctors/doctor.schema';
import { USER_MODEL_NAME } from '@features/users/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export const PATIENT_MODEL_NAME = 'Patient';
@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  _id: false,
})
export class Patient {
  @Prop({ type: Types.ObjectId, ref: USER_MODEL_NAME, required: true })
  _id!: Types.ObjectId;

  @Prop({ type: String, trim: true })
  diagnosis!: string;

  @Prop({ type: String, trim: true })
  medicalHistory!: string;

  @Prop({ type: String, trim: true })
  currentMedications!: string;

  @Prop({ type: Types.ObjectId, ref: DOCTOR_MODEL_NAME })
  treatingDoctor!: Types.ObjectId;
}

export type PatientDocument = HydratedDocument<Patient>;
export const PatientSchema = SchemaFactory.createForClass(Patient);
