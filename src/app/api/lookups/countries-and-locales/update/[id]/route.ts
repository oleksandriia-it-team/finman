import { GetIntegerParamPipe } from '@backend/shared/pipes/get-integer-param.pipe';
import { createRoute } from '@backend/shared/utils/create-route.util';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { countryRepository } from '@backend/entities/country/infrastructure/country.repository';
import { UpdateCountrySchema } from '@common/domains/lookups/schemas/lookups-form.schema';
import { AuthGuard } from '@backend/entities/user/infrastructure/auth.guard';
import { GetUserIdTransformer } from '@backend/shared/transformers/get-user-id.transformer';
import { ExistCountryGuard } from '@backend/entities/country/application/exist-country.guard';

export const PUT = createRoute({
  schema: UpdateCountrySchema,
  paramsFn: (context) => ({ id: GetIntegerParamPipe(context.id, 1) }),
  contextFn: async (request, params) => ({
    userId: await GetUserIdTransformer(request),
    country: await countryRepository.getItemById(params.id),
  }),
  guards: [AuthGuard, ({ context }) => ExistCountryGuard(context.country)],
  execute: async ({ body, context, params: { id } }) => {
    const existing = context.country!;

    await countryRepository.updateItem(id, {
      country: body.countryName ?? existing.country,
      locale: body.localeName ?? existing.locale,
    });

    return { status: 200, data: true };
  },
  filter: getDefaultApiErrorFilter,
});
