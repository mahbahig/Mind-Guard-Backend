import { Controller, Get, Post, Query } from '@nestjs/common';
import { ReadingsService } from './readings.service';
import { Patient } from '@common/decorators';
import { Mood } from '@shared/enums';
import { Types } from 'mongoose';

@Controller('readings')
export class ReadingsController {
  constructor(private readonly readingsService: ReadingsService) {}

  @Post('patient/mood')
  savePatientMood(@Patient('_id') patient: Types.ObjectId, @Query('mood') mood: Mood) {
    return this.readingsService.saveMood(patient, mood);
  }

  @Get('patient/mood')
  getPatientMood(@Patient('_id') patient: Types.ObjectId, @Query('from') from?: Date, @Query('to') to?: Date) {
    return this.readingsService.getMood(patient, from, to);
  }
}
