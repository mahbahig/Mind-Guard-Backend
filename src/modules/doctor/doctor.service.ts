import { DoctorRepository } from '@db/repositories';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserAdapter } from '@shared/adapters';
import { Types } from 'mongoose';

@Injectable()
export class DoctorService {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async getProfile(_id: Types.ObjectId) {
    // Fetch doctor profile from database, throwing an error if not found
    const doctor = await this.doctorRepository.findById(_id);
    if (!doctor) throw new UnauthorizedException('User not found');

    // Convert to safe user and return
    return UserAdapter.toSafeUser(doctor.toObject());
  }
}
