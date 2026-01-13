import { PatientRepository } from '@db/repositories';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserAdapter } from '@shared/adapters';
import { Types } from 'mongoose';

@Injectable()
export class PatientService {
  constructor(private readonly patientRepository: PatientRepository) {}

  async getProfile(_id: Types.ObjectId) {
    // Fetch patient profile from database, throwing an error if not found
    const patient = await this.patientRepository.findById(_id);
    if (!patient) throw new UnauthorizedException('Patient not found');

    // Convert to safe user and return
    return UserAdapter.toSafeUser(patient.toObject());
  }

  async getHrvReadings(patientId: string) {}
}
