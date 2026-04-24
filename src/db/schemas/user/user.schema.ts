import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserGender, UserRole } from '@shared/enums';
import { Types } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: { virtuals: true },
  discriminatorKey: 'role',
})
export class User {
  readonly _id: Types.ObjectId;
  readonly role: UserRole;

  @Prop({ type: String, required: true, minLength: 3, trim: true })
  name: string;

  @Prop({ type: String, required: true, unique: true, trim: true })
  email: string;

  @Prop({ type: String, required: true, trim: true })
  password: string;

  @Prop({ type: String, enum: UserGender })
  gender: UserGender;

  @Prop({ type: Date })
  dateOfBirth: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
