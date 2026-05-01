import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ModelName } from '@shared/enums';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  _id: false,
})
export class Patient {
  @Prop({ type: Types.ObjectId, ref: ModelName.USER, required: true })
  _id: Types.ObjectId;

  @Prop({ type: String, trim: true })
  diagnosis: string;

  @Prop({ type: String, trim: true })
  medicalHistory: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
