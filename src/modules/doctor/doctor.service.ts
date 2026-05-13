import { DoctorRepository } from '@db/repositories';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateSessionSlotsDto } from './dto';

@Injectable()
export class DoctorService {
  constructor(private readonly doctorRepository: DoctorRepository) {}

  async getAllDoctors() {
    let message = 'Doctors retrieved successfully';
    const doctors = await this.doctorRepository.findAll();
    if (!doctors || doctors.length === 0) message = 'No doctors found';
    return { message, data: doctors };
  }

  async getDoctor(doctorId: Types.ObjectId) {
    const doctor = await this.doctorRepository.findById(doctorId);
    if (!doctor) throw new NotFoundException('Doctor not found');
    return { message: 'Doctor retrieved successfully', data: doctor };
  }

  async createSessionSlots(doctorId: Types.ObjectId, createSessionSlotsDto: CreateSessionSlotsDto) {
    // Implementation for creating session slots
    const doctor = await this.doctorRepository.findById(doctorId);
  }
}
