import { registerAs } from '@nestjs/config';
import { Env } from '../config.enum';

export default registerAs(Env.DATABASE, () => ({
  url: process.env.DATABASE_URL,
  name: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
}));
