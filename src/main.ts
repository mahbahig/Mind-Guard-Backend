import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@common/filters';
import { ConfigService } from '@nestjs/config';
import { setConfigService } from '@config/app.config';
import { SuccessResponseInterceptor } from '@common/interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new SuccessResponseInterceptor());
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      validationError: { target: false },
    }),
  );
  setConfigService(app.get(ConfigService));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
