import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { CHAT_MODEL_NAME } from './chat.schema';

export const MESSAGE_MODEL_NAME = 'Message';
@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
})
export class Message {
  readonly _id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: CHAT_MODEL_NAME, index: true, required: true })
  chat!: Types.ObjectId;

  @Prop({ type: Boolean, required: true })
  isSenderUser!: boolean;

  @Prop({ type: String, required: true, trim: true })
  content!: string;
}

export type MessageDocument = HydratedDocument<Message>;
export const MessageSchema = SchemaFactory.createForClass(Message);
