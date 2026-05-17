import { createRoute } from '@backend/shared/utils/create-route.util';
import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { UpdateErrorLogSchema } from '@common/domains/lookups/schemas/lookups-form.schema';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { errorLogApiRepository } from '@backend/entities/error-log/infrastructure/error-log.repository';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { RoleGuard } from '@backend/entities/user/infrastructure/role.guard';
import { RoleEnum } from '@common/domains/user/enums/role.enum';
import { ExistErrorLogGuard } from '@backend/entities/error-log/application/exist-error-log.guard';
import { getDefaultApiErrorFilter } from '../../../shared/get-api-error-filter.util';
import { GetUserRoleTransformer } from '@backend/shared/transformers/get-user-role.transformer';

export const PUT = createRoute({
  schema: UpdateErrorLogSchema,
  paramsFn: (context) => ({ id: GetIntegerParamPipe(context.id, 1) }),
  contextFn: async (request, params) => ({
    userId: await GetUserIdTransformer(request),
    errorLog: await errorLogApiRepository.getItemById(params.id),
    role: await GetUserRoleTransformer(request),
  }),
  guards: [AuthGuard, RoleGuard(RoleEnum.Admin), ({ context }) => ExistErrorLogGuard(context.errorLog)],
  execute: async ({ body, context, params: { id } }) => {
    const existing = context.errorLog!;
    if (body.status === undefined) {
      return { status: 400, message: 'Не передано статус для оновлення' };
    }

    await errorLogApiRepository.updateItem(id, {
      status: body.status ?? existing.status,
    });

    return { status: 200, data: true };
  },
  filter: getDefaultApiErrorFilter,
});
