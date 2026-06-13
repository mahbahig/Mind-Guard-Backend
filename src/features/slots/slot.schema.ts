import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { SlotStatus } from '@shared/enums';
import { DOCTOR_MODEL_NAME } from '@features/doctors';
import { PATIENT_MODEL_NAME } from '@features/patients';

export const SLOT_MODEL_NAME = 'Slot';
@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
})
export class Slot {
  readonly _id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: DOCTOR_MODEL_NAME, required: true })
  doctor!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: PATIENT_MODEL_NAME, default: null })
  patient!: Types.ObjectId | null;

  @Prop({ type: String, trim: true })
  patientEmail?: string;

  @Prop({ type: String, trim: true })
  patientName?: string;

  @Prop({ type: Date, required: true })
  startTime!: Date;

  @Prop({ type: Date, required: true })
  endTime!: Date;

  @Prop({ type: String, enum: SlotStatus, default: SlotStatus.AVAILABLE })
  status!: SlotStatus;

  @Prop({ type: String, trim: true })
  type?: string;

  @Prop({ type: String, trim: true })
  reason?: string;

  @Prop({ type: String, trim: true })
  notes?: string;

  @Prop({ type: String, trim: true })
  doctorNote?: string;

  @Prop({ type: Date })
  bookedAt?: Date;

  @Prop({ type: Date })
  cancelledAt?: Date;

  @Prop({ type: String, trim: true })
  cancelledBy?: string;

  @Prop({ type: Types.ObjectId, ref: SLOT_MODEL_NAME })
  rescheduledTo?: Types.ObjectId;

  @Prop({ type: Date })
  sessionUpdatedAt?: Date;
}

export type SlotDocument = HydratedDocument<Slot>;
export const SlotSchema = SchemaFactory.createForClass(Slot);
