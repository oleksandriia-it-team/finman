import { createRoute } from '@backend/shared/utils/create-route.util';
import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { errorLogApiRepository } from '@backend/entities/error-log/infrastructure/error-log.repository';
import { getDefaultApiErrorFilter } from '../../../shared/get-api-error-filter.util';

export const GET = createRoute({
  paramsFn: (context) => ({
    id: GetIntegerParamPipe(context.id, 1),
  }),
  execute: async ({ params: { id } }) => {
    return {
      status: 200,
      data: await errorLogApiRepository.getItemById(id),
    };
  },
  filter: getDefaultApiErrorFilter,
});
