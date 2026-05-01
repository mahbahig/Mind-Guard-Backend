import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { devConfig, prodConfig } from '@config/env';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule, ChatModule, DoctorModule, PatientModule, UserModule } from './modules';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthGuard, RolesGuard } from '@common/guards';
import { HttpExceptionFilter } from '@common/filters';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';

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
    JwtModule,
    EventEmitterModule.forRoot(),
    UserModule,
    AuthModule,
    PatientModule,
    DoctorModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
