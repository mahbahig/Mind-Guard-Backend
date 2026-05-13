import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ModelName, SlotStatus } from '@shared/enums';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
})
export class Slot {
  readonly _id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: ModelName.DOCTOR, required: true })
  doctor!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: ModelName.PATIENT, default: null })
  patient!: Types.ObjectId | null;

  @Prop({ type: Date, required: true })
  startTime!: Date;

  @Prop({ type: Date, required: true })
  endTime!: Date;

  @Prop({ type: String, enum: SlotStatus, default: SlotStatus.AVAILABLE })
  status!: SlotStatus;
}

export const SlotSchema = SchemaFactory.createForClass(Slot);
