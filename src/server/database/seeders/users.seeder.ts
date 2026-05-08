import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';
import { RoleEnum } from '@common/domains/user/enums/role.enum';

export async function userSeeder() {
  const existingUser = await userApiRepository.findUserForLogin('admin@test.com');
  if (existingUser) {
    console.log('Admin user already exists, skipping seed.');
    return;
  }

  await userApiRepository.createItem({
    email: 'reapersansaut@gmail.com',
    name: 'Main-Admin',
    password: 'password123',
    role: RoleEnum.Admin,
    locale: 'en-US',
    currencyCode: 'USD',
  });
}
