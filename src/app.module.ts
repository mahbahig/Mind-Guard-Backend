import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeaturesModule } from './features';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthGuard, RolesGuard } from '@common/guards';
import { HttpExceptionFilter } from '@common/filters';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppConfigModule } from './config';
import { CoreModule } from '@core';

@Module({
  imports: [AppConfigModule, CoreModule, FeaturesModule, EventEmitterModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
})
export class AppModule {}
