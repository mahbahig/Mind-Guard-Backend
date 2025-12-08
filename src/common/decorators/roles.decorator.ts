import { Reflector } from '@nestjs/core';
import { UserRole } from '@shared/enums';

export const Roles = Reflector.createDecorator<UserRole[]>();
