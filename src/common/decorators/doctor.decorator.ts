import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { DoctorInRequest, RequestWithDoctor } from '@shared/interfaces';

export const Doctor = createParamDecorator((_: unknown, ctx: ExecutionContext): DoctorInRequest => {
  const request: RequestWithDoctor = ctx.switchToHttp().getRequest<RequestWithDoctor>();
  return request.doctor;
});
