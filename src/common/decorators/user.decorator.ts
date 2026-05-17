import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser, UserInRequest } from '@shared/interfaces';

export const User = createParamDecorator((_: unknown, ctx: ExecutionContext): UserInRequest => {
  const request = ctx.switchToHttp().getRequest<RequestWithUser>();
  return request.user;
});
