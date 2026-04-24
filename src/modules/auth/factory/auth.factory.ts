import { Injectable } from '@nestjs/common';
import { RegisterDTO } from '../dto';
import { PatientEntity } from '../entities/patient.entity';
import { hashValue } from '@shared/utils';
import { DoctorEntity } from '../entities/doctor.entity';
import { TitleCasePipe } from '@common/pipes';

@Injectable()
export class AuthFactory {
  constructor(private readonly titleCasePipe: TitleCasePipe) {}

  async createPatient(registerDTO: RegisterDTO): Promise<PatientEntity> {
    const patient = new PatientEntity();

    patient.name = this.titleCasePipe.transform(registerDTO.name);
    patient.email = registerDTO.email;
    patient.password = await hashValue(registerDTO.password);
    patient.gender = registerDTO.gender;
    return patient;
  }

  async createDoctor(registerDTO: RegisterDTO): Promise<DoctorEntity> {
    const doctor = new DoctorEntity();

    doctor.name = registerDTO.name;
    doctor.email = registerDTO.email;
    doctor.password = await hashValue(registerDTO.password);
    doctor.gender = registerDTO.gender;
    doctor.specialization = registerDTO.specialization!;
    doctor.yearsOfExperience = registerDTO.yearsOfExperience!;
    doctor.licenseNumber = registerDTO.licenseNumber!;

    return doctor;
  }
}
