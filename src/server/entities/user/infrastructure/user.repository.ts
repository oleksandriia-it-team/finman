import { CrudApiRepository } from '../../../database/crud.api.repository';
import { UserOrm } from './user.orm';
import { type CreateUserDto } from '@common/domains/user/schema/user.schema';
import bcrypt from 'bcrypt';
import DBDataSource from '@backend/database/database-connection';

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
  async getUserNameById(id: number): Promise<string | null> {
    const user = await this.repository
      .createQueryBuilder('user')
      .select('user.name')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      return null;
    }

    return user.name;
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
    const queryRunner = DBDataSource.createQueryRunner();
    const updateData: Partial<UserOrm> = {};

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (data.name !== undefined) {
        updateData.name = data.name;
      }

      if (data.locale !== undefined) {
        updateData.locale = data.locale;
      }

      if (data.language !== undefined) {
        updateData.language = data.language;
      }

      if (data.password) {
        updateData.password = await bcrypt.hash(data.password, 10);
      }

      await queryRunner.manager.update(UserOrm, id, updateData);

      const user = await queryRunner.manager.findOneBy(UserOrm, { id });

      await queryRunner.commitTransaction();

      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

export const userApiRepository = new UserApiRepository();
