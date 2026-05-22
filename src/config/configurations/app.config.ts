import { registerAs } from '@nestjs/config';
import { Env } from '../config.enum';

export default registerAs(Env.APP, () => ({
  name: process.env.APP_NAME,
  env: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  apiPrefix: process.env.API_PREFIX,
  apiVersion: process.env.API_VERSION,
  clientUrl: process.env.CLIENT_URL,
}));
