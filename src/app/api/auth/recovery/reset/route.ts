import { createRoute } from '@backend/shared/utils/create-route.util';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';
import { getDefaultApiErrorFilter } from '../../../shared/get-api-error-filter.util';
import { ValidCodeGuard } from '../verify/guards';
import { ResetPasswordSchema } from '@common/domains/auth/schema/reset-password.schema';
import { isEmpty } from '@common/utils/is-empty.util';
import { resetPasswordApiUseCase } from '@backend/features/recovery/reset-password.api.use-case';

export const POST = createRoute({
  schema: ResetPasswordSchema,
  guards: [({ body }) => ValidCodeGuard(body)],
  execute: async ({ body }) => {
    const userId = await userApiRepository.findUserForLogin(body.email).then((user) => user?.id);

    if (isEmpty(userId)) {
      return {
        status: 400,
        message: 'Користувача з таким email не існує',
      };
    }

    await resetPasswordApiUseCase.execute({
      userId,
      ...body,
    });

    return { status: 200, data: true };
  },

  filter: getDefaultApiErrorFilter,
});
