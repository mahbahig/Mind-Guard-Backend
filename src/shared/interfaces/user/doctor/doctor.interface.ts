import { SafeUser } from '../safe-user.interface';

export interface Doctor extends SafeUser {
  specialization: string;
  licenseNumber?: string;
  clinicAddress?: string;
  yearsOfExperience?: number;
}
