import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reading } from '@db/schemas';
import { ModelName, Mood, ReadingType } from '@shared/enums';

@Injectable()
export class ReadingRepository extends AbstractRepository<Reading> {
  constructor(@InjectModel(ModelName.READING) private readonly readingModel: Model<Reading>) {
    super(readingModel);
  }

  saveMood(patientId: Types.ObjectId, mood: Mood) {
    return this.create({ patient: patientId, type: ReadingType.MOOD, value: mood });
  }
}
