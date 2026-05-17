import { Body, Controller, Post } from '@nestjs/common';
import { ReadingService } from './reading.service';
import type { UserInRequest } from '@shared/interfaces';
import { User } from '@common/decorators';
import { Mood } from '@shared/enums';

@Controller('reading')
export class ReadingController {
  constructor(private readonly readingService: ReadingService) {}

  @Post('patient/mood')
  savePatientMood(@User() user: UserInRequest, @Body('mood') mood: Mood) {
    return this.readingService.saveMood(user._id, mood);
  }
}
