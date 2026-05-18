import { createRoute } from '@backend/shared/utils/create-route.util';
import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { errorLogApiRepository } from '@backend/entities/error-log/infrastructure/error-log.repository';
import { getDefaultApiErrorFilter } from '../../../shared/get-api-error-filter.util';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { RoleGuard } from '@backend/entities/user/infrastructure/role.guard';
import { RoleEnum } from '@common/domains/user/enums/role.enum';
import { GetUserRoleTransformer } from '@backend/shared/transformers/get-user-role.transformer';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';

export const GET = createRoute({
  paramsFn: (context) => ({
    id: GetIntegerParamPipe(context.id, 1),
  }),
  contextFn: async (request) => ({
    role: await GetUserRoleTransformer(request),
    userId: await GetUserIdTransformer(request),
  }),
  guards: [(params) => AuthGuard(params), (params) => RoleGuard(RoleEnum.Admin)(params)],
  execute: async ({ params: { id } }) => {
    return {
      status: 200,
      data: await errorLogApiRepository.getItemById(id),
    };
  },
  filter: getDefaultApiErrorFilter,
});
