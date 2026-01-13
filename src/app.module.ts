import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { devConfig, prodConfig } from '@config/env';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule, ChatModule, PatientModule } from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'production' ? undefined : '.env.development',
      load: process.env.NODE_ENV === 'production' ? [prodConfig] : [devConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({ uri: configService.get<string>('db.url') }),
    }),
    AuthModule,
    PatientModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
