import { UserGender, UserRole } from '@shared/enums';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Doctor } from './register-doctor.validation';

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  @IsNotEmpty()
  @IsEnum(UserGender)
  gender: UserGender;

  @Doctor()
  specialization?: string;

  @Doctor()
  licenseNumber?: string;

  @Doctor()
  yearsOfExperience?: number;
}
