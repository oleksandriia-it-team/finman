import { CrudApiRepository } from '../../../database/crud.api.repository';
import { UserOrm } from './user.orm';
import { type CreateUserDto } from '@common/domains/user/schema/user.schema';
import bcrypt from 'bcrypt';
import type { FindOptionsWhere, QueryDeepPartialEntity } from 'typeorm';

export class UserApiRepository extends CrudApiRepository<UserOrm, never, CreateUserDto> {
  constructor() {
    super(UserOrm, 'users');
  }

  override async createItem(data: CreateUserDto): Promise<number> {
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    return super.createItem({
      ...data,
      email: data.email.trim().toLowerCase(),
      password: hashedPassword,
    });
  }

  async findUserForLogin(login: string): Promise<UserOrm | null> {
    return await this.repository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .leftJoinAndSelect('user.totp', 'totp')
      .where('user.email = :login OR user.name = :login', { login })
      .getOne();
  }
  async resetPassword(emailRaw: string, newPasswordRaw: string): Promise<boolean> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPasswordRaw, saltRounds);
    const email = emailRaw.trim().toLowerCase();
    const whereCondition: FindOptionsWhere<UserOrm> = { email };
    const updateData: QueryDeepPartialEntity<UserOrm> = { password: hashedPassword };
    const result = await this.repository.update(whereCondition, updateData);

    return (result.affected ?? 0) > 0;
  }

  async isPasswordValid(id: number, password: string): Promise<boolean> {
    const user = await this.repository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      return false;
    }

    return bcrypt.compare(password, user.password);
  }

  async updateProfileSettings(
    id: number,
    data: Partial<Pick<UserOrm, 'name' | 'locale' | 'language' | 'password'>>,
  ): Promise<UserOrm | null> {
    const updateData: Record<string, unknown> = {};

    if (data.name !== undefined) updateData.name = data.name;
    if (data.locale !== undefined) updateData.locale = data.locale;
    if (data.language !== undefined) updateData.language = data.language;
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    if (Object.keys(updateData).length > 0) {
      await this.repository.update({ id }, updateData);
    }

    return this.repository.findOneBy({ id });
  }

  override getItemById(id: number): Promise<UserOrm | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['totp'],
    });
  }

  async deleteAccount(id: number): Promise<boolean> {
    const result = await this.repository.delete({ id });

    return (result.affected ?? 0) > 0;
  }
}

export const userApiRepository = new UserApiRepository();
