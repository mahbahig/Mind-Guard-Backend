import { Controller, Post, Query } from '@nestjs/common';
import { ReadingsService } from './readings.service';
import type { UserInRequest } from '@shared/interfaces';
import { User } from '@common/decorators';
import { Mood } from '@shared/enums';

@Controller('readings')
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService) {}

  @Post('patient/mood')
  savePatientMood(@User() user: UserInRequest, @Query('mood') mood: Mood) {
    return this.readingsService.saveMood(user._id, mood);
  }
}
