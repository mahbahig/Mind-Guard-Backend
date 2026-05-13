import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ModelName, ReadingType } from '@shared/enums';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
})
export class Reading {
  readonly _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: ModelName.PATIENT, required: true, index: true })
  patient: Types.ObjectId;

  @Prop({ type: String, enum: ReadingType, required: true })
  type: ReadingType;

  @Prop({ type: String, required: true })
  value: string;
}

export const ReadingSchema = SchemaFactory.createForClass(Reading);
