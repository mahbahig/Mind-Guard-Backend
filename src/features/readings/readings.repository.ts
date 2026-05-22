import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseRepository } from '@database';
import { Model, Types } from 'mongoose';
import { Mood, ReadingType } from '@shared/enums';
import { Reading, READING_MODEL_NAME, ReadingDocument } from './reading.schema';

@Injectable()
export class ReadingsRepository extends BaseRepository<Reading> {
  constructor(@InjectModel(READING_MODEL_NAME) private readonly readingModel: Model<ReadingDocument>) {
    super(readingModel);
  }

  saveMood(patientId: Types.ObjectId, mood: Mood) {
    return this.create({ patient: patientId, type: ReadingType.MOOD, value: mood });
  }
}
