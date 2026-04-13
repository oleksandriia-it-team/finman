import { createRoute } from '@backend/shared/utils/create-route.util';
import { RegularEntrySchema } from '@common/domains/regular-entry/schema/regular-entry.schema';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { regularEntryApiRepository } from '@backend/entities/regular-entry/infrastructure/regular-entry.repository';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';

export const PUT = createRoute({
  schema: RegularEntrySchema,
  contextFn: GetUserIdTransformer,
  paramsFn: (context) => ({
    id: GetIntegerParamPipe(context.id, 1),
  }),
  guards: [AuthGuard],
  execute: async ({ context, body, params: { id } }) => {
    const userId = context as number;

    await regularEntryApiRepository.updateItem(id, { ...body, userId });

    return {
      status: 200,
      data: true,
    };
  },
  filter: getDefaultApiErrorFilter,
});
