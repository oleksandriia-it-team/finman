import { createRoute } from '@backend/shared/utils/create-route.util';
import { GetUserRoleTransformer } from '@backend/shared/transformers/get-user-role.transformer';
import { errorLogApiRepository } from '@backend/entities/error-log/infrastructure/error-log.repository';
import { getDefaultApiErrorFilter } from '../../shared/get-api-error-filter.util';
import { ErrorLogSchema } from '@common/domains/lookups/schemas/error-log.schema';

export const POST = createRoute({
  schema: ErrorLogSchema.itemsSchema,
  contextFn: GetUserRoleTransformer,
  execute: async ({ body }) => {
    return {
      status: 200,
      data: await errorLogApiRepository.getItems(body.from, body.to, body.filters),
    };
  },
  filter: getDefaultApiErrorFilter,
});
