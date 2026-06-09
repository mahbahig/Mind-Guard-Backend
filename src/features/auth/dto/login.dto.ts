import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
export class LoginDTO {
  @ApiProperty({
    example: 'user@example.com',
    description: 'User email',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'password123',
    description: 'User password',
    minLength: 6,
    maxLength: 72,
  })
  @MinLength(6)
  @MaxLength(72)
  @IsNotEmpty()
  @IsString()
  password!: string;

  @ApiPropertyOptional({ example: false, description: 'Keeps the user logged in across sessions', default: false })
  @IsOptional()
  @IsBoolean()
  rememberMe: boolean = false;
}
