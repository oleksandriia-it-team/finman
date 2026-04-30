import { createRoute } from '@backend/shared/utils/create-route.util';
import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { countryRepository } from '@backend/entities/country/infrastructure/country.repository';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { ExistCountryGuard } from '@backend/entities/country/application/exist-country.guard';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';

export const DELETE = createRoute({
  paramsFn: (context) => ({ id: GetIntegerParamPipe(context.id, 1) }),
  contextFn: async (request, params) => ({
    userId: await GetUserIdTransformer(request),
    country: await countryRepository.getItemById(params.id),
  }),
  guards: [AuthGuard, ({ context }) => ExistCountryGuard(context.country)],
  execute: async ({ params: { id } }) => {
    await countryRepository.deleteItem(id, true);
    return { status: 200, data: true };
  },
  filter: getDefaultApiErrorFilter,
});
