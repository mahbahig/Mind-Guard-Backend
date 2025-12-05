import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TitleCasePipe implements PipeTransform<string, string> {
  transform(value: string): string {
    return value
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
