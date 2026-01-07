import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { devConfig, prodConfig } from '@config/env';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules';
import { PatientModule } from './modules/patient/patient.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
