import { createRoute } from '@backend/shared/utils/create-route.util';
import { RegisterDto, RegisterSchema } from '@common/domains/auth/schema/register.schema';
import { RoleEnum } from '@common/domains/user/enums/role.enum';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';

export const POST = createRoute({
  schema: RegisterSchema,
  execute: async ({ body }: { body: RegisterDto }) => {
    const isEmailTaken = await userApiRepository.findUserForLogin(body.email);
    const isNameTaken = await userApiRepository.findUserForLogin(body.name);

    if (isEmailTaken) {
      return { status: 400, code: 'EMAIL_ALREADY_EXISTS', message: 'Ця електронна адреса вже існує' };
    }

    if (isNameTaken) {
      return { status: 400, code: 'NAME_ALREADY_EXISTS', message: "Це ім'я вже існує" };
    }

    await userApiRepository.createItem({ ...body, role: RoleEnum.User });

    return { status: 200, data: { success: true } };
  },
});
