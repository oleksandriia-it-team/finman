import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';
import { RoleEnum } from '@common/domains/user/enums/role.enum';

export async function userSeeder() {
  await userApiRepository.createItem({
    email: 'admin@test.com',
    name: 'Main-Admin',
    password: 'password123',
    role: RoleEnum.Admin,
  });
}
