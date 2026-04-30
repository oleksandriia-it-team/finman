import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { createRoute } from '@backend/shared/utils/create-route.util';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { userApiRepository } from '@backend/entities/user/infrastructure/user.repository';

export const GET = createRoute({
  paramsFn: (context) => ({
    id: GetIntegerParamPipe(context.id, 1),
  }),
  execute: async ({ params: { id } }) => {
    return {
      status: 200,
      data: await userApiRepository.getUserNameById(id),
    };
  },
  filter: getDefaultApiErrorFilter,
});
