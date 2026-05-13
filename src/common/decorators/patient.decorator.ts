import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PatientInRequest, RequestWithPatient } from '@shared/interfaces';

export const Patient = createParamDecorator((_: unknown, ctx: ExecutionContext): PatientInRequest => {
  const request: RequestWithPatient = ctx.switchToHttp().getRequest<RequestWithPatient>();
  return request.patient;
});
