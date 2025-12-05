import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { AuthFactory } from './factory/auth.factory';
import { DoctorRepository, PatientRepository, UserRepository } from '@db/repositories';
import { PatientEntity } from './entities/patient.entity';
import { UserRole } from '@shared/enums';
import { DoctorEntity } from './entities/doctor.entity';
import { TitleCasePipe } from '@common/pipes';
import { LoginDTO } from './dto';
import { compareHash } from '@shared/utils';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly authFactory: AuthFactory,
    private readonly patientRepository: PatientRepository,
    private readonly doctorRepository: DoctorRepository,
    private readonly userRepository: UserRepository,
    private readonly titleCasePipe: TitleCasePipe,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async register(registerDTO: RegisterDTO) {
    const userExist = await this.userRepository.findByEmail(registerDTO.email);
    if (userExist) throw new ConflictException('Email already in use');

    if (registerDTO.password !== registerDTO.confirmPassword) throw new BadRequestException('Passwords do not match');

    let user;
    if (registerDTO.role == UserRole.PATIENT) {
      const patient: PatientEntity = await this.authFactory.createPatient(registerDTO);
      user = await this.patientRepository.create(patient);
    } else if (registerDTO.role == UserRole.DOCTOR) {
      if (await this.doctorRepository.findOne({ licenseNumber: registerDTO.doctor?.licenseNumber }))
        throw new ConflictException('License number already in use');
      const doctor: DoctorEntity = await this.authFactory.createDoctor(registerDTO);
      user = await this.doctorRepository.create(doctor);
    }

    const token = this.jwtService.sign(
      { userId: user._id, email: user.email, name: user.name, role: (user as any).role },
      { secret: this.configService.get<string>('jwt.secret') },
    );

    return { success: true, message: `${this.titleCasePipe.transform(registerDTO.role)} registered successfully`, token };
  }

  async login(loginDTO: LoginDTO) {
    const user = await this.userRepository.findByEmail(loginDTO.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    if (!await compareHash(loginDTO.password, user.password)) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign(
      { userId: user._id, email: user.email, name: user.name, role: (user as any).role },
      { secret: this.configService.get<string>('jwt.secret') },
    );

    return { success: true, message: 'Login successful', token };
  }
}
