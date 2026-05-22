import { Roles } from '@common/decorators';
import { DoctorsService, PatientsService } from '@features';
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@shared/enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly patientsService: PatientsService,
    private readonly doctorsService: DoctorsService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [context.getHandler(), context.getClass()]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.getAllAndOverride(Roles, [context.getHandler(), context.getClass()]);

    if (!roles.includes(request.user.role.toLowerCase())) throw new UnauthorizedException('Access denied. You are not authorized to access this resource');

    if (request.user.role === UserRole.DOCTOR) {
      const doctor = await this.doctorsService.findById(request.user._id);
      if (!doctor) throw new UnauthorizedException('Access denied. You are not authorized to access this resource');
      request.doctor = doctor;
    } else if (request.user.role === UserRole.PATIENT) {
      const patient = await this.patientsService.findById(request.user._id);
      if (!patient) throw new UnauthorizedException('Access denied. You are not authorized to access this resource');
      request.patient = patient;
    }

    return true;
  }
}
