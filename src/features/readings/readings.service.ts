import { Injectable } from '@nestjs/common';
import { Mood } from '@shared/enums';
import { Types } from 'mongoose';
import { ReadingsRepository } from './readings.repository';

@Injectable()
export class ReadingsService {
  constructor(private readonly readingsRepository: ReadingsRepository) {}

  async saveMood(patientId: Types.ObjectId, mood: Mood) {
    const reading = await this.readingsRepository.saveMood(patientId, mood);
    return { message: 'Mood saved successfully', data: reading };
  }
}
