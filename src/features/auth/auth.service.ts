import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';
import { UsersService } from '@features/users';
import { Env } from '@config';
import { HashingService, TokenPrefix, UserRole } from '@shared';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly hashingService: HashingService,
  ) {}

  async register(registerDTO: RegisterDTO) {
    // Check if passwords match
    if (registerDTO.password !== registerDTO.confirmPassword) throw new BadRequestException('Passwords do not match');

    // Send user data to users module
    const user = await this.usersService.createUser(registerDTO);
    // Generate JWT token
    const token = this.createToken(user._id, registerDTO.email, registerDTO.name, registerDTO.role, true);
    return { message: 'User registered successfully', data: token };
  }

  async login(loginDTO: LoginDTO) {
    // Find user by email
    const user = await this.usersService.findByEmail(loginDTO.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Compare user password with hashed password
    if (!(await this.hashingService.compare(loginDTO.password, user.password))) throw new UnauthorizedException('Invalid credentials');

    // Generate JWT token
    const token = this.createToken(user._id, user.email, user.name, user.role, loginDTO.rememberMe);

    return { message: 'Login successful', data: token };
  }

  async forgetPassword(email: string) {
    // Check if user exists
    if (!(await this.usersService.findByEmail(email))) throw new BadRequestException('User with this email does not exist');
  }

  createToken(_id: Types.ObjectId, email: string, name: string, role: UserRole, rememberMe: boolean) {
    const jwtOptions = {
      secret: this.configService.getOrThrow<string>(Env.JWT_SECRET),
    };

    // Generate JWT token
    let token = this.jwtService.sign({ _id, email, name, role, rememberMe }, jwtOptions);
    // Add Bearer prefix to token
    token = `${TokenPrefix.BEARER} ${token}`;

    return token;
  }
}
