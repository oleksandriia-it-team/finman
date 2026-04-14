import { CrudApiRepository } from '../../../shared/infrastructure/crud.api.repository';
import { UserOrm } from './user.orm';
import { type CreateUserDto } from '@common/domains/user/schema/user.schema';
import bcrypt from 'bcrypt';

export class UserApiRepository extends CrudApiRepository<UserOrm, never, CreateUserDto> {
  constructor() {
    super(UserOrm);
  }

  override async createItem(data: CreateUserDto): Promise<number> {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    return super.createItem({
      ...data,
      password: hashedPassword,
    });
  }

  async findUserForLogin(login: string): Promise<UserOrm | null> {
    return await this.repository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.email = :login OR user.name = :login', { login })
      .getOne();
  }
}

export const userApiRepository = new UserApiRepository();
