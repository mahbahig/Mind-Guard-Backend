import { JwtPayload } from 'jsonwebtoken';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPrefix } from '@shared/enums';
import { UserRepository } from '@db/repositories';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    // Handle missing authorization token
    if (!authorization) throw new UnauthorizedException('Authorization token is missing');

    // Split the authorization header
    const [prefix, token]: string[] = authorization.split(' ');
    // Handle invalid format
    if (!prefix || !token) throw new UnauthorizedException('Invalid authorization token format');

    let payload: JwtPayload;
    // Validate token prefix
    if (prefix.toLowerCase() == TokenPrefix.BEARER) {
      payload = this.jwtService.verify(token, { secret: this.configService.get<string>('jwt.patient.secret') });
    } else if (prefix.toLowerCase() == TokenPrefix.DOCTOR) {
      payload = this.jwtService.verify(token, { secret: this.configService.get<string>('jwt.doctor.secret') });
    } else {
      throw new UnauthorizedException('Invalid token prefix');
    }

    // Check for payload validity
    if (!payload || !payload._id) throw new UnauthorizedException('Invalid token payload');
    // Check if user exists in database
    if (!(await this.userRepository.exists(payload._id))) throw new UnauthorizedException('User does not exist');

    // Attach user info to request
    request.user = payload;

    return true;
  }
}
