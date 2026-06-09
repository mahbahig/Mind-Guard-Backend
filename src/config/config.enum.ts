export enum Env {
  // App
  APP = 'app',
  APP_NAME = 'app.name',
  APP_PORT = 'app.port',
  APP_ENV = 'app.env',
  APP_API_PREFIX = 'app.apiPrefix',
  APP_API_VERSION = 'app.apiVersion',
  APP_CLIENT_URL = 'app.clientUrl',

  // Database
  DATABASE = 'database',
  DATABASE_NAME = 'database.name',
  DATABASE_URL = 'database.url',
  DATABASE_USERNAME = 'database.username',
  DATABASE_PASSWORD = 'database.password',

  // JWT
  JWT = 'jwt',
  JWT_SECRET = 'jwt.secret',
  JWT_EXPIRES_IN = 'jwt.expiresIn',

  // Redis
  REDIS = 'redis',
  REDIS_HOST = 'redis.host',
  REDIS_PORT = 'redis.port',
  REDIS_PASSWORD = 'redis.password',

  // Hashing
  HASHING = 'hashing',
  HASHING_SALT_ROUNDS = 'hashing.saltRounds',

  // Throttle
  THROTTLE = 'throttle',
  THROTTLE_TTL = 'throttle.ttl',
  THROTTLE_LIMIT = 'throttle.limit',

  // Ai Service
  AI = 'ai',
  AI_SERVER_URL = 'ai.serverUrl',
}
