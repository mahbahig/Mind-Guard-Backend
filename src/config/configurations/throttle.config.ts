import { registerAs } from '@nestjs/config';
import { Env } from '../config.enum';

export default registerAs(Env.THROTTLE, () => ({
  ttl: parseInt(process.env.THROTTLE_TTL!, 10),
  limit: parseInt(process.env.THROTTLE_LIMIT!, 10),
}));
