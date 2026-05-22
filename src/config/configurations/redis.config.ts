import { registerAs } from '@nestjs/config';
import { Env } from '../config.enum';

export default registerAs(Env.REDIS, () => ({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD || undefined,
}));
