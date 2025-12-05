import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDoctorDTO {
  @IsString()
  @IsNotEmpty()
  specialization: string;

  @IsString()
  @IsNotEmpty()
  licenseNumber: string;

  @IsInt()
  @IsNotEmpty()
  yearsOfExperience: number;
}
