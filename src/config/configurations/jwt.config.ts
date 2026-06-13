import { registerAs } from '@nestjs/config';
import { Env } from '../config.enum';

export default registerAs(Env.JWT, () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_EXPIRES_IN,
}));
