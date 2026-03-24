import { CrudApiRepository } from '../../../shared/infrastructure/crud.api.repository';
import { UserOrm } from './user.orm';
import { CreateUserDto } from '@common/domains/user/schema/user.schema';
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
}

export const userApiRepository = new UserApiRepository();
