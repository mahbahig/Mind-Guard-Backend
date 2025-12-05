import { UserEntity } from './user.entity';

export class DoctorEntity extends UserEntity {
  specialization: string;
  licenseNumber: string;
  clinicAddress: string;
  yearsOfExperience: number;
}
