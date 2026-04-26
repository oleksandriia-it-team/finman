import { CrudApiRepository } from '../../../database/crud.api.repository';
import { UserOrm } from './user.orm';
import { type CreateUserDto } from '@common/domains/user/schema/user.schema';
import bcrypt from 'bcrypt';
import type { FindOptionsWhere, QueryDeepPartialEntity } from 'typeorm';

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

  async resetPassword(email: string, newPasswordRaw: string): Promise<boolean> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPasswordRaw, saltRounds);
    const whereCondition: FindOptionsWhere<UserOrm> = { email };
    const updateData: QueryDeepPartialEntity<UserOrm> = { password: hashedPassword };
    const result = await this.repository.update(whereCondition, updateData);

    return (result.affected ?? 0) > 0;
  }
}

export const userApiRepository = new UserApiRepository();
