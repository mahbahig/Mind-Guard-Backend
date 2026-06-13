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

  getMoodReadings(patientId: Types.ObjectId, from?: string, to?: string) {
    const filter: Record<string, unknown> = {
      patient: patientId,
      type: ReadingType.MOOD,
    };

    if (from || to) {
      filter.createdAt = {};
      if (from) (filter.createdAt as Record<string, Date>).$gte = new Date(from);
      if (to) (filter.createdAt as Record<string, Date>).$lte = new Date(to);
    }

    return this.readingModel.find(filter).sort({ createdAt: 1, _id: 1 });
  }
}
