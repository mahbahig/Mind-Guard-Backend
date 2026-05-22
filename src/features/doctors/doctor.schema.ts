import { USER_MODEL_NAME } from '@features/users/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export const DOCTOR_MODEL_NAME = 'Doctor';
@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  _id: false,
})
export class Doctor {
  @Prop({ type: Types.ObjectId, ref: USER_MODEL_NAME, required: true })
  _id!: Types.ObjectId;

  @Prop({ type: String, default: '1h', trim: true })
  sessionTime!: string;

  @Prop({ type: String, required: true, trim: true })
  specialization!: string;

  @Prop({ type: String, trim: true })
  clinicAddress!: string;

  @Prop({ type: Number, trim: true })
  yearsOfExperience!: number;
}

export type DoctorDocument = HydratedDocument<Doctor>;
export const DoctorSchema = SchemaFactory.createForClass(Doctor);
