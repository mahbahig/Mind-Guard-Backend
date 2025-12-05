import { UserGender, UserRole } from '@shared/enums';
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength, ValidateIf, ValidateNested } from 'class-validator';
import { RegisterDoctorDTO } from './register-doctor.dto';

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

  @ValidateIf((dto) => dto.role == UserRole.DOCTOR)
  @ValidateNested()
  @Type(() => RegisterDoctorDTO)
  @IsNotEmpty()
  doctor?: RegisterDoctorDTO;

  @IsString()
  @IsNotEmpty()
  @IsEnum(UserGender)
  gender: UserGender;
}
