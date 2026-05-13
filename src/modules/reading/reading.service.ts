import { ReadingRepository } from '@db/repositories';
import { Injectable } from '@nestjs/common';
import { Mood } from '@shared/enums';
import { Types } from 'mongoose';

@Injectable()
export class ReadingService {
  constructor(private readonly readingRepository: ReadingRepository) {}

  async saveMood(patientId: Types.ObjectId, mood: Mood) {
    const reading = await this.readingRepository.saveMood(patientId, mood);
    return { message: 'Mood saved successfully', data: reading };
  }
}
