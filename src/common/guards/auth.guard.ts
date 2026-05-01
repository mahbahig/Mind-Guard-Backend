import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPrefix } from '@shared/enums';
import { UserRepository } from '@db/repositories';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [context.getHandler(), context.getClass()]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    // Handle missing authorization token
    if (!authorization) throw new UnauthorizedException('Authorization token is missing');

    // Split the authorization header
    const tokenArray = authorization.split(' ');
    if (tokenArray.length !== 2) throw new UnauthorizedException('Invalid authorization token format');
    const [prefix, token]: string[] = tokenArray;
    // Handle invalid format
    if (!prefix || !token) throw new UnauthorizedException('Invalid authorization token format');

    // Validate token prefix
    if (prefix.toLowerCase() !== TokenPrefix.BEARER) throw new UnauthorizedException('Invalid token prefix');
    const payload = this.jwtService.verify(token, { secret: this.configService.get<string>('jwt.user.secret') });

    // Check for payload validity
    if (!payload || !payload._id) throw new UnauthorizedException('Invalid token payload');
    // Check if user exists in database
    const user = await this.userRepository.findById(payload._id);
    if (!user) throw new UnauthorizedException('User does not exist');

    // Attach user info to request
    request.user = user;

    return true;
  }
}
