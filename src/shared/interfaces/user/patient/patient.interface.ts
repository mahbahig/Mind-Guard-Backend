import { SafeUser } from '../safe-user.interface';

export interface Patient extends SafeUser {
  diagnosis?: string;
  medicalHistory?: string;
}
