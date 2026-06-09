import { UserGender, UserRole } from '@shared/enums';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Doctor } from './register-doctor.validation';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDTO {
  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
    minLength: 3,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name!: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address associated with the account',
    format: 'email',
  })
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase().trim())
  email!: string;

  @ApiProperty({
    example: '••••••••',
    description: 'Account password',
    format: 'password',
    minLength: 6,
    maxLength: 72,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(72)
  password!: string;

  @ApiProperty({
    example: '••••••••',
    description: 'Must match the password field exactly',
    format: 'password',
    minLength: 6,
    maxLength: 72,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(72)
  confirmPassword!: string;

  @ApiProperty({
    example: UserRole.PATIENT,
    description: 'Role assigned to the user',
    enum: UserRole,
    enumName: 'UserRole',
  })
  @IsNotEmpty()
  @IsEnum(UserRole)
  role!: UserRole;

  @ApiProperty({
    example: UserGender.MALE,
    description: 'Gender of the user',
    enum: UserGender,
    enumName: 'UserGender',
  })
  @IsNotEmpty()
  @IsEnum(UserGender)
  gender!: UserGender;

  @ApiPropertyOptional({
    example: 'Cardiology',
    description: `Doctor specialization — required when role is "${UserRole.DOCTOR}", ignored otherwise`,
    minLength: 3,
  })
  @Doctor()
  specialization?: string;
}
