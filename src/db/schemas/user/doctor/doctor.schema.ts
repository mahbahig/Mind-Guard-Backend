import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../user.schema';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  discriminatorKey: 'role',
})
export class Doctor extends User {
  @Prop({ type: String, required: true, trim: true })
  specialization: string;

  @Prop({ type: String, unique: true, trim: true })
  licenseNumber: string;

  @Prop({ type: String, trim: true })
  clinicAddress: string;

  @Prop({ type: Number, trim: true })
  yearsOfExperience: number;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
