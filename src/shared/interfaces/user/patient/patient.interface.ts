import { BaseUser } from '../base-user.interface';

export interface Patient extends BaseUser {
  diagnosis?: string;
  medicalHistory?: string;
}
