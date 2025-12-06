import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { AuthFactory } from './factory/auth.factory';
import { DoctorRepository, PatientRepository, UserRepository } from '@db/repositories';
import { PatientEntity } from './entities/patient.entity';
import { TokenPrefix, UserRole } from '@shared/enums';
import { DoctorEntity } from './entities/doctor.entity';
import { LoginDTO } from './dto';
import { compareHash } from '@shared/utils';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Types } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly authFactory: AuthFactory,
    private readonly patientRepository: PatientRepository,
    private readonly doctorRepository: DoctorRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDTO: RegisterDTO) {
    // Check if user already exists
    const userExist = await this.userRepository.findByEmail(registerDTO.email);
    if (userExist) throw new ConflictException('Email already in use');

    // Check if passwords match
    if (registerDTO.password !== registerDTO.confirmPassword) throw new BadRequestException('Passwords do not match');

    // Register user based on role
    if (registerDTO.role.toLowerCase() === UserRole.PATIENT.toLowerCase()) return this.registerPatient(registerDTO);
    else if (registerDTO.role.toLowerCase() === UserRole.DOCTOR.toLowerCase()) return this.registerDoctor(registerDTO);
    else throw new BadRequestException('Invalid role');
  }

  async registerPatient(registerDTO: RegisterDTO) {
    // Create patient
    const patient: PatientEntity = await this.authFactory.createPatient(registerDTO);
    // Save patient to database
    const user = await this.patientRepository.create(patient);

    // Generate JWT token
    const token = this.createToken(user._id, user.email, user.name, UserRole.PATIENT);

    return { success: true, message: 'Patient registered successfully', token };
  }

  async registerDoctor(registerDTO: RegisterDTO) {
    // Check if license number is already in use
    if (await this.doctorRepository.findOne({ licenseNumber: registerDTO.doctor?.licenseNumber })) {
      throw new ConflictException('License number already in use');
    }

    // Create doctor
    const doctor: DoctorEntity = await this.authFactory.createDoctor(registerDTO);
    // Save doctor to database
    const user = await this.doctorRepository.create(doctor);

    // Generate JWT token
    const token = this.createToken(user._id, user.email, user.name, UserRole.DOCTOR);

    return { success: true, message: 'Doctor registered successfully', token };
  }

  async login(loginDTO: LoginDTO) {
    // Find user by email
    const user = await this.userRepository.findByEmail(loginDTO.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Compare user password with hashed password
    if (!(await compareHash(loginDTO.password, user.password))) throw new UnauthorizedException('Invalid credentials');

    // Generate JWT token
    const token = this.createToken(user._id, user.email, user.name, user.role);

    return { success: true, message: 'Login successful', token };
  }

  createToken(userId: Types.ObjectId, email: string, name: string, role: UserRole) {
    let jwtOptions: JwtSignOptions;
    let prefix: string;

    if (role.toLowerCase() == UserRole.PATIENT.toLowerCase()) {
      jwtOptions = {
        secret: this.configService.get<string>('jwt.patient.secret'),
      };
      prefix = TokenPrefix.BEARER;
    } else if (role.toLowerCase() == UserRole.DOCTOR.toLowerCase()) {
      jwtOptions = {
        secret: this.configService.get<string>('jwt.doctor.secret'),
      };
      prefix = TokenPrefix.DOCTOR;
    } else {
      throw new BadRequestException('Invalid role');
    }

    // Generate JWT token
    let token = this.jwtService.sign({ userId, email, name, role }, jwtOptions);
    // Add Bearer prefix to token
    token = `${prefix} ${token}`;

    return token;
  }
}
