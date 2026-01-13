import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../abstract.repository';
import { Patient } from '@db/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType, QueryOptions } from 'mongoose';

@Injectable()
export class PatientRepository extends AbstractRepository<Patient> {
  constructor(@InjectModel(Patient.name) private readonly patientModel: Model<Patient>) {
    super(patientModel);
  }

  async findByEmail(email: string, projection?: ProjectionType<Patient>, options?: QueryOptions<Patient>) {
    return await this.patientModel.findOne({ email }, projection, options);
  }

  async exists(email: string) {
    return await this.findByEmail(email);
  }
}
