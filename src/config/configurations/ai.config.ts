import { registerAs } from '@nestjs/config';
import { Env } from '../config.enum';

export default registerAs(Env.AI, () => ({
  serverUrl: process.env.AI_SERVER_URL,
}));
