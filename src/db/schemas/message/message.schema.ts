import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MessageSender } from '@shared/enums';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
})
export class Message {
  readonly _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Chat', required: true })
  chatId: Types.ObjectId;

  @Prop({ type: String, enum: MessageSender, required: true })
  sender: MessageSender;

  @Prop({ type: String, required: true })
  content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
