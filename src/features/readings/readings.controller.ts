import { Controller, Get, Post, Query } from '@nestjs/common';
import { ReadingsService } from './readings.service';
import type { UserInRequest } from '@shared/interfaces';
import { User } from '@common/decorators';
import { Mood } from '@shared/enums';

@Controller(['readings', 'reading'])
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService) {}

  @Post('patient/mood')
  savePatientMood(@User() user: UserInRequest, @Query('mood') mood: Mood) {
    return this.readingsService.saveMood(user._id, mood);
  }

  @Get('patient/mood')
  getPatientMood(@User() user: UserInRequest, @Query('from') from?: string, @Query('to') to?: string) {
    return this.readingsService.getMoodHistory(user._id, from, to);
  }
}
