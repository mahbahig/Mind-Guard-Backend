import { Injectable } from '@nestjs/common';
import { RegisterDTO } from '../auth/dto';
import { HashingService } from '@shared/utils';
import { TitleCasePipe } from '@common/pipes';
import { User } from './user.schema';

@Injectable()
export class UsersFactory {
  constructor(
    private readonly titleCasePipe: TitleCasePipe,
    private readonly hashingService: HashingService,
  ) {}

  async createUser(registerDTO: RegisterDTO): Promise<User> {
    const user = new User();

    user.name = this.titleCasePipe.transform(registerDTO.name);
    user.email = registerDTO.email;
    user.password = await this.hashingService.hash(registerDTO.password);
    user.gender = registerDTO.gender;
    user.role = registerDTO.role;

    return user;
  }
}
