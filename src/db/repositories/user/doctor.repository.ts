import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../abstract.repository';
import { Doctor } from '@db/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType, QueryOptions } from 'mongoose';

@Injectable()
export class DoctorRepository extends AbstractRepository<Doctor> {
  constructor(@InjectModel(Doctor.name) private readonly doctorModel: Model<Doctor>) {
    super(doctorModel);
  }

  async findByEmail(email: string, projection?: ProjectionType<Doctor>, options?: QueryOptions<Doctor>) {
    return await this.doctorModel.findOne({ email }, projection, options);
  }

  async exists(email: string) {
    return await this.findByEmail(email);
  }
}
