import { createRoute } from '@backend/shared/utils/create-route.util';
import { ErrorTexts } from '@common/constants/error-texts.constant';
import { RoleEnum } from '@common/domains/user/enums/role.enum';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';
import { getDefaultApiErrorFilter } from '../../shared/get-api-error-filter.util';
import { type RegisterDto, RegisterSchema } from '@common/domains/auth/schema/register.schema';

export const POST = createRoute({
  schema: RegisterSchema,
  guards: [
    async ({ body }) => {
      const isEmailTaken = await userApiRepository.findUserForLogin(body.email);
      const isNameTaken = await userApiRepository.findUserForLogin(body.name);

      if (isEmailTaken) {
        return { status: 400, message: ErrorTexts.EmailAlreadyExists };
      }

      if (isNameTaken) {
        return { status: 400, message: ErrorTexts.NameAlreadyExists };
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
