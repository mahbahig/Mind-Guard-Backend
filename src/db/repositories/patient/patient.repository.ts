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
}
