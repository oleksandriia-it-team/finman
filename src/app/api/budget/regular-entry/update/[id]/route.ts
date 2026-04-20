import { createRoute } from '@backend/shared/utils/create-route.util';
import { RegularEntrySchema } from '@common/domains/regular-entry/schema/regular-entry.schema';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { regularEntryApiRepository } from '@backend/entities/regular-entry/infrastructure/regular-entry.repository';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { ExistRegularEntryGuard } from '@backend/entities/regular-entry/application/exist-regular-entry.guard';

export const PUT = createRoute({
  schema: RegularEntrySchema.omit({
    id: true,
  }),
  paramsFn: (context) => ({
    id: GetIntegerParamPipe(context.id, 1),
  }),
  contextFn: async (request, params) => ({
    userId: await GetUserIdTransformer(request),
    regularEntry: await regularEntryApiRepository.getItemById(params.id),
  }),
  guards: [AuthGuard, ({ context }) => ExistRegularEntryGuard(context.regularEntry)],
  execute: async ({ context, body, params: { id } }) => {
    const userId = context.userId as number;

    await regularEntryApiRepository.updateItem(id, { ...body, userId });

    return {
      status: 200,
      data: true,
    };
  },
  filter: getDefaultApiErrorFilter,
});
