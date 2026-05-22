import pino from 'pino';
import pinoHttp from 'pino-http';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const logger = pino();
const httpLogger = pinoHttp({
  logger,
  customLogLevel: (_req: Request, res: Response, err?: Error) => {
    if (err || res.statusCode >= 500) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
  customSuccessObject: (req: Request, res: Response, val: object) => ({
    // ...val,
    method: req.method,
    url: req.url,
    statusCode: res.statusCode,
  }),
  customErrorObject: (req: Request, res: Response, err: Error, val: object) => ({
    // ...val,
    method: req.method,
    url: req.url,
    statusCode: res.statusCode,
    error: err.message,
  }),
  customAttributeKeys: { responseTime: 'responseTime' },
  serializers: {
    req: () => undefined,
    res: () => undefined,
  },
});

@Injectable()
export class PinoLoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    httpLogger(req, res);
    next();
  }
}
