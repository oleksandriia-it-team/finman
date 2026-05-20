import { createRoute } from '@backend/shared/utils/create-route.util';
import { errorLogApiRepository } from '@backend/entities/error-log/infrastructure/error-log.repository';
import { getDefaultApiErrorFilter } from '../../shared/get-api-error-filter.util';
import { ErrorLogSchema } from '@common/domains/lookups/schemas/error-log.schema';
import { RoleGuard } from '@backend/entities/user/infrastructure/role.guard';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { RoleEnum } from '@common/domains/user/enums/role.enum';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { GetUserRoleTransformer } from '@backend/shared/transformers/get-user-role.transformer';

export const POST = createRoute({
  schema: ErrorLogSchema.itemsSchema,
  contextFn: async (request) => ({
    userId: await GetUserIdTransformer(request),
    role: await GetUserRoleTransformer(request),
  }),
  guards: [(params) => AuthGuard(params), (params) => RoleGuard(RoleEnum.Admin)(params)],
  execute: async ({ body }) => {
    return {
      status: 200,
      data: await errorLogApiRepository.getItems(body.from, body.to, body.filters),
    };
  },
  filter: getDefaultApiErrorFilter,
});
