import { Prop, Schema } from '@nestjs/mongoose';
import { ModelName, ReadingType } from '@shared/enums';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
})
export class Reading {
  readonly _id: Types.ObjectId;
  readonly type: ReadingType;

  @Prop({ type: Types.ObjectId, ref: ModelName.PATIENT, required: true, index: true })
  patient: Types.ObjectId;
}
