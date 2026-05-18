import { GetUserRoleTransformer } from '@backend/shared/transformers/get-user-role.transformer';
import { createRoute } from '@backend/shared/utils/create-route.util';
import { errorLogApiRepository } from '@backend/entities/error-log/infrastructure/error-log.repository';
import { getDefaultApiErrorFilter } from '../../shared/get-api-error-filter.util';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { RoleGuard } from '@backend/entities/user/infrastructure/role.guard';
import { RoleEnum } from '@common/domains/user/enums/role.enum';

export const POST = createRoute({
  contextFn: async (request) => ({
    userId: await GetUserIdTransformer(request),
    role: await GetUserRoleTransformer(request),
  }),
  guards: [(params) => AuthGuard(params), (params) => RoleGuard(RoleEnum.Admin)(params)],
  execute: async () => {
    return {
      status: 200,
      data: await errorLogApiRepository.getStatusesCount(),
    };
  },
  filter: getDefaultApiErrorFilter,
});
