import { BaseUser, SafeUser } from '@shared/interfaces';

export class UserAdapter {
  static toSafeUser(user: BaseUser): SafeUser {
    const { password, createdAt, updatedAt, __v, ...safeUser } = user;
    return safeUser as SafeUser;
  }
}
