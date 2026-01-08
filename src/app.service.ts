import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1>Hello From Mental Health Backend Server!</h1>';
  }
}
