import { USER_MODEL_NAME } from '@features/users';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export const CHAT_MODEL_NAME = 'Chat';
@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
})
export class Chat {
  readonly _id!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: USER_MODEL_NAME, required: true })
  user!: Types.ObjectId;

  @Prop({ type: String })
  context!: string;
}

export type ChatDocument = HydratedDocument<Chat>;
export const ChatSchema = SchemaFactory.createForClass(Chat);
