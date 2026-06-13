import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateSessionSlotsDto } from './dto';
import { DoctorsRepository } from './doctors.repository';

@Injectable()
export class DoctorsService {
  constructor(private readonly doctorsRepository: DoctorsRepository) {}

  async createDoctor(doctorId: Types.ObjectId, specialization: string) {
    return await this.doctorsRepository.create({ _id: doctorId, specialization });
  }

  async getAllDoctors() {
    let message = 'Doctors retrieved successfully';
    const doctors = await this.doctorsRepository.findAll();
    if (!doctors || doctors.length === 0) message = 'No doctors found';
    return { message, data: doctors };
  }

  async getDoctor(doctorId: Types.ObjectId) {
    const doctor = await this.doctorsRepository.findById(doctorId);
    if (!doctor) throw new NotFoundException('Doctor not found');
    return { message: 'Doctor retrieved successfully', data: doctor };
  }

  async findById(doctorId: Types.ObjectId) {
    return await this.doctorsRepository.findById(doctorId);
  }
}
