import { createRoute } from '@backend/shared/utils/create-route.util';
import { RegisterDto, RegisterSchema } from '@common/domains/auth/schema/register.schema';
import { RoleEnum } from '@common/domains/user/enums/role.enum';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';

export const POST = createRoute({
  schema: RegisterSchema,
  guards: [
    async ({ body }) => {
      const isEmailTaken = await userApiRepository.findUserForLogin(body.email);
      const isNameTaken = await userApiRepository.findUserForLogin(body.name);

      if (isEmailTaken) {
        return { status: 400, message: 'Ця електронна адреса вже існує' };
      }

      if (isNameTaken) {
        return { status: 400, message: "Це ім'я вже існує" };
      }

      return null;
    },
  ],
  execute: async ({ body }: { body: RegisterDto }) => {
    await userApiRepository.createItem({ ...body, role: RoleEnum.User });

    return { status: 200, data: true };
  },
  filter: getDefaultApiErrorFilter,
});
