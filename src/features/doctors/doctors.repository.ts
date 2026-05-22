import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType, QueryOptions } from 'mongoose';
import { BaseRepository } from '@database';
import { Doctor, DOCTOR_MODEL_NAME } from './doctor.schema';

@Injectable()
export class DoctorsRepository extends BaseRepository<Doctor> {
  constructor(@InjectModel(DOCTOR_MODEL_NAME) private readonly doctorModel: Model<Doctor>) {
    super(doctorModel);
  }
}
