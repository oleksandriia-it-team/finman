import { createRoute } from '@backend/shared/utils/create-route.util';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { regularEntryApiRepository } from '@backend/entities/regular-entry/infrastructure/regular-entry.repository';
import { OwnsRegularEntryGuard } from '@backend/entities/regular-entry/application/owns-regular-entry.guard';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';

export const GET = createRoute({
  paramsFn: (context) => ({
    id: GetIntegerParamPipe(context.id, 1),
  }),
  contextFn: async (request, params) => ({
    userId: await GetUserIdTransformer(request),
    regularEntry: await regularEntryApiRepository.getItemById(params.id),
  }),
  guards: [AuthGuard, ({ context: { userId, regularEntry } }) => OwnsRegularEntryGuard(regularEntry, userId as number)],
  execute: async ({ context }) => {
    return {
      status: 200,
      data: context.regularEntry,
    };
  },
  filter: getDefaultApiErrorFilter,
});
