import { createRoute } from '@backend/shared/utils/create-route.util';
import { errorLogApiRepository } from '@backend/entities/error-log/infrastructure/error-log.repository';
import { getDefaultApiErrorFilter } from '../../shared/get-api-error-filter.util';
import { ErrorLogSchema } from '@common/domains/lookups/schemas/error-log.schema';

export const POST = createRoute({
  schema: ErrorLogSchema.totalCountSchema,
  execute: async ({ body }) => {
    return {
      status: 200,
      data: await errorLogApiRepository.getTotalCount(body.filters),
    };
  },
  filter: getDefaultApiErrorFilter,
});
