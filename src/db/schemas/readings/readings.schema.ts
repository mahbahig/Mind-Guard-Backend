import { Prop, Schema } from "@nestjs/mongoose";
import { ReadingType } from "@shared/enums";
import { Types } from "mongoose";

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  // discriminatorKey: 'type',
})
export class Reading {
  readonly _id: Types.ObjectId;
  readonly type: ReadingType;

  @Prop({ type: Types.ObjectId, ref: 'Patient', required: true })
  patientId: Types.ObjectId;
}