import { GetUserRoleTransformer } from '@backend/shared/transformers/get-user-role.transformer';
import { createRoute } from '@backend/shared/utils/create-route.util';
import { errorLogApiRepository } from '@backend/entities/error-log/infrastructure/error-log.repository';
import { getDefaultApiErrorFilter } from '../../shared/get-api-error-filter.util';

export const POST = createRoute({
  contextFn: GetUserRoleTransformer,
  execute: async () => {
    return {
      status: 200,
      data: await errorLogApiRepository.getStatusesCount(),
    };
  },
  filter: getDefaultApiErrorFilter,
});
