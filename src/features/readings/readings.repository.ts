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

  getMood(patientId: Types.ObjectId, from?: Date, to?: Date) {
    const filter: Record<string, any> = { patient: patientId, type: ReadingType.MOOD };
    if (from || to) filter.createdAt = {};
    if (from) filter.createdAt.$gte = from;
    if (to) filter.createdAt.$lte = to;
    return this.findMany(filter, { createdAt: -1 });
  }
}
