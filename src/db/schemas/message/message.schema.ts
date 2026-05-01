import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MessageSender, ModelName } from '@shared/enums';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
})
export class Message {
  readonly _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: ModelName.CHAT, index: true, required: true })
  chat: Types.ObjectId;

  @Prop({ type: String, enum: MessageSender, required: true })
  sender: MessageSender;

  @Prop({ type: String, required: true, trim: true })
  content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
