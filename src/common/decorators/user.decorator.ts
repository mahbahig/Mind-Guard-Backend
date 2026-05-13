import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser, UserInToken } from '@shared/interfaces';

export const User = createParamDecorator((_: unknown, ctx: ExecutionContext): UserInToken => {
  const request = ctx.switchToHttp().getRequest<RequestWithUser>();
  return request.user;
});
