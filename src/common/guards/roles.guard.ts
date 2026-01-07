import { Roles } from '@common/decorators';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.getAllAndMerge(Roles, [context.getClass(), context.getHandler()]);

    if (!request.user) throw new UnauthorizedException('Please login to access this resource');
    if (!roles.includes(request.user.role.toLowerCase())) throw new UnauthorizedException('Access denied. You are not authorized to access this resource');

    return true;
  }
}
