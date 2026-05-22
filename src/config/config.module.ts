import { ConfigModule } from '@nestjs/config';
import { aiConfig, appConfig, databaseConfig, hashingConfig, jwtConfig, redisConfig, throttleConfig } from './configurations';
import { envValidationSchema } from './validation/env.validation';

export const AppConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: `.env.${process.env.NODE_ENV ?? 'development'}`,
  load: [appConfig, databaseConfig, jwtConfig, redisConfig, throttleConfig, hashingConfig, aiConfig],
  validationSchema: envValidationSchema,
  validationOptions: { abortEarly: false },
});
