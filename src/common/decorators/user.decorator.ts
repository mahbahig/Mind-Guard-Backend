import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestWithUser, UserInRequest } from '@shared/interfaces';

export const User = createParamDecorator((field: keyof UserInRequest | undefined, ctx: ExecutionContext): any => {
  const request = ctx.switchToHttp().getRequest<RequestWithUser>();
  const user = request.user;
  return field ? user[field] : user;
});
