import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPrefix } from '@shared/enums';
import { Reflector } from '@nestjs/core';
import { UsersService } from '@features';
import { Env } from '@config';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { Types } from 'mongoose';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
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
    let payload: { _id?: string };
    try {
      payload = this.jwtService.verify(token, {
        secret: this.configService.getOrThrow<string>(Env.JWT_SECRET),
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Authorization token has expired');
      }
      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid authorization token');
      }
      throw error;
    }

    // Check for payload validity
    if (!payload || !payload._id) throw new UnauthorizedException('Invalid token payload');
    if (!Types.ObjectId.isValid(payload._id)) throw new UnauthorizedException('Invalid token payload');
    // Check if user exists in database
    const user = await this.usersService.findById(new Types.ObjectId(payload._id));
    if (!user) throw new UnauthorizedException('User does not exist');

    // Attach user info to request
    request.user = user;

    return true;
  }
}
