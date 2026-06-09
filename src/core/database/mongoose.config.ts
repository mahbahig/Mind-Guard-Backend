import { Env } from '@config';
import { ConfigService } from '@nestjs/config';
import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';

export const mongooseConfig = (): MongooseModuleAsyncOptions => ({
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    uri: configService.getOrThrow(Env.DATABASE_URL),
    dbName: configService.getOrThrow(Env.DATABASE_NAME),

    maxPoolSize: 50,
    minPoolSize: 10,
    socketTimeoutMS: 45000,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,

    autoIndex: configService.getOrThrow(Env.APP_ENV) !== 'production',

    retryAttempts: 5,
    retryDelay: 3000,

    connectionFactory: (connection) => {
      connection.on('connected', () => {
        console.log('Mongoose connected to database');
      });
      connection.on('disconnected', () => {
        console.log('Mongoose disconnected from database');
      });
      connection.on('error', (err) => {
        console.error('Mongoose connection error:', err);
      });
      return connection;
    },
  }),
});
