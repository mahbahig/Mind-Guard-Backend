import { PATIENT_MODEL_NAME } from '@features/patients';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ReadingType } from '@shared/enums';
import { HydratedDocument, Types } from 'mongoose';

export const READING_MODEL_NAME = 'Reading';
@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
})
export class Reading {
  readonly _id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: PATIENT_MODEL_NAME, required: true, index: true })
  patient!: Types.ObjectId;

  @Prop({ type: String, enum: ReadingType, required: true })
  type!: ReadingType;

  @Prop({ type: String, required: true })
  value!: string;
}

export type ReadingDocument = HydratedDocument<Reading>;
export const ReadingSchema = SchemaFactory.createForClass(Reading);
