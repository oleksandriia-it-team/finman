import { LoginDto, LoginSchema } from '@common/domains/auth/schema/login.schema';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';
import bcrypt from 'bcrypt';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { createRoute } from '@backend/shared/utils/create-route.util';
import { createAccessToken } from '@backend/shared/utils/jwt.util';

export const POST = createRoute({
  schema: LoginSchema,
  execute: async ({ body }: { body: LoginDto }) => {
    const user = await userApiRepository.findUserForLogin(body.login);
    if (!user) {
      return {
        status: 401,
        message: 'Недійсні облікові дані',
      };
    }
    const isMatch = await bcrypt.compare(body.password, user.password as string);
    if (!isMatch) {
      return {
        status: 401,
        message: 'Недійсні облікові дані',
      };
    }
    const token = await createAccessToken({
      userId: user.id,
      role: user.role,
    });
    return {
      status: 200,
      data: { token },
    };
  },
  filter: getDefaultApiErrorFilter,
});
