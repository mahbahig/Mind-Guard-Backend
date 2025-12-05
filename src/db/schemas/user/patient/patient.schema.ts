import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../user.schema';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  discriminatorKey: 'role',
})
export class Patient extends User {
  @Prop({ type: String, trim: true })
  diagnosis: string;

  @Prop({ type: String, trim: true })
  medicalHistory: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
