import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { PatientsRepository } from './patients.repository';
@Injectable()
export class PatientsService {
  constructor(private readonly patientsRepository: PatientsRepository) {}

  async createPatient(patientId: Types.ObjectId) {
    return await this.patientsRepository.create({ _id: patientId });
  }

  async findById(patientId: Types.ObjectId) {
    return await this.patientsRepository.findById(patientId);
  }

  async getDoctorPatients(doctorId: Types.ObjectId) {
    let message = 'Patients retrieved successfully';
    const patients = await this.patientsRepository.findMany({ treatingDoctor: doctorId });
    if (!patients.length) message = 'No patients for this doctor';
    return { message, data: patients };
  }
}
