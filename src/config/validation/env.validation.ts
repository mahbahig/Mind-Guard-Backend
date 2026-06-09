import * as Joi from 'joi';

export const envValidationSchema = Joi.object({
  // App
  APP_NAME: Joi.string().default('Mind-Guard-Backend'),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  PORT: Joi.number().default(3000),
  API_PREFIX: Joi.string().default('api'),
  API_VERSION: Joi.string().default('v1'),
  CLIENT_URL: Joi.string().uri().optional(),

  // Database
  DATABASE_URL: Joi.string().required(),
  // TODO: Check if these are actually required or if we can use a connection string with embedded credentials
  DATABASE_NAME: Joi.string().default('mind-guard'),
  // DATABASE_USERNAME: Joi.string().when('NODE_ENV', {
  //   is: 'production',
  //   then: Joi.required(),
  //   otherwise: Joi.optional(),
  // }),
  // DATABASE_PASSWORD: Joi.string().when('NODE_ENV', {
  //   is: 'production',
  //   then: Joi.required(),
  //   otherwise: Joi.optional(),
  // }),

  // JWT
  JWT_SECRET: Joi.string().min(10).required(),
  JWT_EXPIRES_IN: Joi.string().default('7d'),

  // Redis
  // TODO: ADD REDIS
  // REDIS_HOST: Joi.string().required(),
  // REDIS_PORT: Joi.number().default(6379),
  // REDIS_PASSWORD: Joi.string().optional(),

  // Hashing
  HASHING_SALT_ROUNDS: Joi.number().min(10).max(14).default(12),

  // Queue
  QUEUE_CONCURRENCY: Joi.number().default(5),

  // Throttle
  THROTTLE_TTL: Joi.number().default(60),
  THROTTLE_LIMIT: Joi.number().default(100),

  // Ai
  AI_SERVER_URL: Joi.string().required(),
});
