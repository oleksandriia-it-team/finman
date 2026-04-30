import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { createRoute } from '@backend/shared/utils/create-route.util';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';

export const GET = createRoute({
  contextFn: GetUserIdTransformer,

  paramsFn: (context) => ({
    id: GetIntegerParamPipe(context.id, 1),
  }),

  guards: [AuthGuard],

  execute: async ({ params: { id } }) => {
    const name = await userApiRepository.getUserNameById(id);

    return {
      status: 200,
      data: { name },
    };
  },
  filter: getDefaultApiErrorFilter,
});
