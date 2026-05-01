import { DoctorRepository } from '@db/repositories';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DoctorService {
  constructor(private readonly doctorRepository: DoctorRepository) {}
}
