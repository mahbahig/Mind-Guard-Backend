import { PatientRepository } from '@db/repositories';
import { Injectable } from '@nestjs/common';
@Injectable()
export class PatientService {
  constructor(private readonly patientRepository: PatientRepository) {}

  async getHrvReadings(patientId: string) {}
}
