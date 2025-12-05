import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../abstract.repository';
import { Doctor } from '@db/schemas';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DoctorRepository extends AbstractRepository<Doctor> {
  constructor(@InjectModel(Doctor.name) private readonly doctorModel: Model<Doctor>) {
    super(doctorModel);
  }
}
