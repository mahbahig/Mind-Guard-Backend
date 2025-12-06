import { BaseUser } from '../base-user.interface';

export interface Doctor extends BaseUser {
  specialization: string;
  licenseNumber?: string;
  clinicAddress?: string;
  yearsOfExperience?: number;
}
