import { Injectable } from '@nestjs/common';
import { RegisterDTO } from '../dto';
import { hashValue } from '@shared/utils';
import { DoctorEntity } from '../entities/doctor.entity';
import { TitleCasePipe } from '@common/pipes';
import { UserEntity } from '../entities/user.entity';
import { Types } from 'mongoose';

@Injectable()
export class AuthFactory {
  constructor(private readonly titleCasePipe: TitleCasePipe) {}

  async createUser(registerDTO: RegisterDTO): Promise<UserEntity> {
    const user = new UserEntity();

    user.name = this.titleCasePipe.transform(registerDTO.name);
    user.email = registerDTO.email;
    user.password = await hashValue(registerDTO.password);
    user.gender = registerDTO.gender;
    user.role = registerDTO.role;

    return user;
  }

  createDoctor(userId: Types.ObjectId, registerDTO: RegisterDTO): DoctorEntity {
    const doctor = new DoctorEntity();

    doctor._id = userId;
    doctor.specialization = registerDTO.specialization!;
    doctor.yearsOfExperience = registerDTO.yearsOfExperience!;

    return doctor;
  }
}
