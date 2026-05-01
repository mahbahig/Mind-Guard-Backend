import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ModelName } from '@shared/enums';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
})
export class Chat {
  readonly _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: ModelName.USER, required: true })
  user: Types.ObjectId;

  @Prop({ type: String })
  context: string;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
