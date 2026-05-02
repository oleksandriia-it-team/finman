import { CrudApiRepository } from '../../../database/crud.api.repository';
import { UserOrm } from './user.orm';
import { type CreateUserDto } from '@common/domains/user/schema/user.schema';
import bcrypt from 'bcrypt';
import { type ProfileSettingsData } from '@common/domains/profile/schema/profile-settings.schema';

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
    data: Pick<ProfileSettingsData, 'name' | 'locale' | 'language'> & { password?: string | undefined },
  ): Promise<UserOrm | null> {
    const updateData: Partial<UserOrm> = {
      name: data.name,
      locale: data.locale,
      language: data.language,
    };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    await this.repository.update(id, updateData);

    return this.getItemById(id);
  }
}

export const userApiRepository = new UserApiRepository();
