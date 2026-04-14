import { createRoute } from '@backend/shared/utils/create-route.util';
import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { regularEntryApiRepository } from '@backend/entities/regular-entry/infrastructure/regular-entry.repository';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { OwnsRegularEntryGuard } from '@backend/entities/regular-entry/application/owns-regular-entry.guard';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { ExistRegularEntryGuard } from '@backend/entities/regular-entry/application/exist-regular-entry.guard';

export const DELETE = createRoute({
  paramsFn: (context) => ({
    id: GetIntegerParamPipe(context.id, 1),
  }),
  contextFn: async (request, params) => ({
    userId: await GetUserIdTransformer(request),
    regularEntry: await regularEntryApiRepository.getItemById(params.id),
  }),
  guards: [
    AuthGuard,
    ({ context }) => ExistRegularEntryGuard(context.regularEntry),
    ({ context: { userId, regularEntry } }) => OwnsRegularEntryGuard(regularEntry, userId as number),
  ],
  execute: async ({ params: { id } }) => {
    await regularEntryApiRepository.deleteItem(id, true);

    return {
      status: 200,
      data: true,
    };
  },
  filter: getDefaultApiErrorFilter,
});
