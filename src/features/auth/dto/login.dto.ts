import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
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
  })
  @IsNotEmpty()
  @IsString()
  password!: string;

  @ApiProperty({ example: true, description: 'Remember me option'})
  @IsNotEmpty()
  @IsBoolean()
  rememberMe!: boolean;
}
