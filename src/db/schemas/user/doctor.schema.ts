import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ModelName } from '@shared/enums';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  _id: false,
})
export class Doctor {
  @Prop({ type: Types.ObjectId, ref: ModelName.USER, required: true })
  _id: Types.ObjectId;

  @Prop({ type: String, required: true, trim: true })
  specialization: string;

  @Prop({ type: String, trim: true })
  clinicAddress: string;

  @Prop({ type: Number, trim: true })
  yearsOfExperience: number;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
