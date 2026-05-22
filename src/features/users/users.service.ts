import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UsersFactory } from './users.factory';
import { RegisterDTO } from '@features/auth/dto';
import { UserRole } from '@shared/enums';
import { PatientsService } from '@features/patients';
import { DoctorsService } from '@features/doctors';
import { MongoServerError } from 'mongodb';
import { Types } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersFactory: UsersFactory,
    private readonly patientsService: PatientsService,
    private readonly doctorsService: DoctorsService,
  ) {}

  async createUser(registerDTO: RegisterDTO) {
    const userData = await this.usersFactory.createUser(registerDTO);
    try {
      const user = await this.usersRepository.create(userData);
      switch (registerDTO.role.toLowerCase()) {
        case UserRole.PATIENT.toLowerCase():
          return this.patientsService.createPatient(user._id);
        case UserRole.DOCTOR.toLowerCase():
          return this.doctorsService.createDoctor(user._id, registerDTO.specialization!);
        default:
          throw new BadRequestException('Invalid user role');
      }
    } catch (error) {
      if (error instanceof MongoServerError && error.code === 11000) throw new BadRequestException('Email already exists');
      else throw error;
    }
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }

  async findById(id: Types.ObjectId) {
    return await this.usersRepository.findById(id);
  }
}
