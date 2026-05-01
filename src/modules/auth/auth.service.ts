import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthFactory } from './factory/auth.factory';
import { DoctorRepository, PatientRepository, UserRepository } from '@db/repositories';
import { TokenPrefix, UserRole } from '@shared/enums';
import { LoginDTO, RegisterDTO } from './dto';
import { compareHash } from '@shared/utils';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly authFactory: AuthFactory,
    private readonly userRepository: UserRepository,
    private readonly patientRepository: PatientRepository,
    private readonly doctorRepository: DoctorRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDTO: RegisterDTO) {
    // Check if user already exists
    const userExist = await this.userRepository.findByEmail(registerDTO.email);
    if (userExist) throw new ConflictException('Email already in use');

    // Check if passwords match
    if (registerDTO.password !== registerDTO.confirmPassword) throw new BadRequestException('Passwords do not match');

    const userEntity = await this.authFactory.createUser(registerDTO);
    const user = await this.userRepository.create(userEntity);

    // Register user based on role
    if (registerDTO.role.toLowerCase() === UserRole.PATIENT.toLowerCase()) return this.registerPatient(user._id, userEntity);
    else if (registerDTO.role.toLowerCase() === UserRole.DOCTOR.toLowerCase()) return this.registerDoctor(user._id, registerDTO);
    else throw new BadRequestException('Invalid role');
  }

  async registerPatient(userId: Types.ObjectId, userEntity: UserEntity) {
    // Create patient
    const patient = await this.patientRepository.create({ _id: userId });
    // Generate JWT token
    const token = this.createToken(patient._id, userEntity.email, userEntity.name, UserRole.PATIENT);

    return { message: 'Patient registered successfully', token };
  }

  async registerDoctor(userId: Types.ObjectId, registerDTO: RegisterDTO) {
    // Create doctor
    const doctorEntity = this.authFactory.createDoctor(userId, registerDTO);

    // Save doctor to database
    const doctor = await this.doctorRepository.create(doctorEntity);

    // Generate JWT token
    const token = this.createToken(userId, registerDTO.email, registerDTO.name, UserRole.DOCTOR);

    return { message: 'Doctor registered successfully', token };
  }

  async login(loginDTO: LoginDTO) {
    // Find user by email
    const user = await this.userRepository.findByEmail(loginDTO.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Compare user password with hashed password
    if (!(await compareHash(loginDTO.password, user.password))) throw new UnauthorizedException('Invalid credentials');

    // Generate JWT token
    const token = this.createToken(user._id, user.email, user.name, user.role);

    return { message: 'Login successful', token };
  }

  createToken(_id: Types.ObjectId, email: string, name: string, role: UserRole) {
    const jwtOptions = {
      secret: this.configService.get<string>('jwt.user.secret'),
    };

    // Generate JWT token
    let token = this.jwtService.sign({ _id, email, name, role }, jwtOptions);
    // Add Bearer prefix to token
    token = `${TokenPrefix.BEARER} ${token}`;

    return token;
  }
}
