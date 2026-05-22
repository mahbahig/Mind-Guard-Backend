import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType, QueryOptions } from 'mongoose';
import { BaseRepository } from '@database';
import { Patient, PATIENT_MODEL_NAME, PatientDocument } from './patient.schema';

@Injectable()
export class PatientsRepository extends BaseRepository<Patient> {
  constructor(@InjectModel(PATIENT_MODEL_NAME) private readonly patientModel: Model<PatientDocument>) {
    super(patientModel);
  }
}
