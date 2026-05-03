import { createRoute } from '@backend/shared/utils/create-route.util';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';
import { recoveryCodeRepository } from '@backend/entities/recovery-code/infrastructure/recovery-code.repository';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { ValidCodeGuard } from '../verify/guards';
import { ResetPasswordSchema } from '@common/domains/auth/schema/reset-password.schema';

export const POST = createRoute({
  schema: ResetPasswordSchema,
  guards: [({ body }) => ValidCodeGuard(body)],

  execute: async ({ body }) => {
    const isSuccess = await userApiRepository.resetPassword(body.email, body.password);

    if (!isSuccess) {
      return { status: 400 as const, message: 'Не вдалося оновити пароль' };
    }
    await recoveryCodeRepository.deleteUserCodes(body.email);

    return { status: 200, data: true };
  },

  filter: getDefaultApiErrorFilter,
});
