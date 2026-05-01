import { Roles } from '@common/decorators';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [context.getHandler(), context.getClass()]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.getAllAndOverride(Roles, [context.getHandler(), context.getClass()]);

    if (!roles.includes(request.user.role.toLowerCase())) throw new UnauthorizedException('Access denied. You are not authorized to access this resource');

    return true;
  }
}
