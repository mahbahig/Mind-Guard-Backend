import { PatientRepository } from '@db/repositories';
import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
@Injectable()
export class PatientService {
  constructor(private readonly patientRepository: PatientRepository) {}

  async getDoctorPatients(doctorId: Types.ObjectId) {
    let message = 'Patients retrieved successfully';
    const patients = await this.patientRepository.findMany({ treatingDoctor: doctorId });
    if (!patients.length) message = 'No patients for this doctor';
    return { message, data: patients };
  }
}
