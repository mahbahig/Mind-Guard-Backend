import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { PinoLoggerMiddleware } from "./logger.middleware";

@Module({})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PinoLoggerMiddleware).forRoutes({
      path: '*path',
      method: RequestMethod.ALL,
    });
  }
}
