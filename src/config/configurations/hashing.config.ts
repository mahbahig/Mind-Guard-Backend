import { registerAs } from '@nestjs/config';
import { Env } from '../config.enum';

export default registerAs(Env.HASHING, () => ({
  saltRounds: Number(process.env.HASHING_SALT_ROUNDS),
}));
