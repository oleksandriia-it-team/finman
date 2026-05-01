import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { createRoute } from '@backend/shared/utils/create-route.util';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { GetUserRoleTransformer } from '@backend/shared/transformers/get-user-role.transformer';
import { RoleEnum } from '@common/domains/user/enums/role.enum';

export const GET = createRoute({
  contextFn: async (request) => ({
    userId: await GetUserIdTransformer(request),
    role: await GetUserRoleTransformer(request),
  }),

  paramsFn: (context) => ({
    id: GetIntegerParamPipe(context.id, 1),
  }),

  guards: [
    ({ context }) => (context.userId ? null : { status: 401, message: 'Ви не авторизовані' }),
    ({ context, params }) =>
      context.userId === params.id || context.role === RoleEnum.Admin
        ? null
        : { status: 403, message: 'Недостатньо прав' },
  ],

  execute: async ({ params: { id } }) => {
    const name = await userApiRepository.getUserNameById(id);

    return {
      status: 200,
      data: { name },
    };
  },
  filter: getDefaultApiErrorFilter,
});
