import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PatientInRequest, RequestWithPatient } from '@shared/interfaces';

export const Patient = createParamDecorator((field: keyof PatientInRequest | undefined, ctx: ExecutionContext): any => {
  const request = ctx.switchToHttp().getRequest<RequestWithPatient>();
  const patient = request.patient;
  return field ? patient[field] : patient;
});

