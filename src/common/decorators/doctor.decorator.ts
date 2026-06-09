import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DoctorInRequest, RequestWithDoctor } from '@shared/interfaces';

export const Doctor = createParamDecorator((field: keyof DoctorInRequest | undefined, ctx: ExecutionContext): any => {
  const request = ctx.switchToHttp().getRequest<RequestWithDoctor>();
  const doctor = request.doctor;
  return field ? doctor[field] : doctor;
});
