import { CountriesAndLocalesSchema } from '../shared/schemas/countries-and-locales.schema';
import { createRoute } from '@backend/shared/utils/create-route.util';
import { countryRepository } from '@backend/entities/country/infrastructure/country.repository';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';

export const POST = createRoute({
  schema: CountriesAndLocalesSchema.totalCountSchema,
  execute: async ({ body }) => {
    return {
      status: 200,
      data: await countryRepository.getTotalCount(body.filters),
    };
  },
  filter: getDefaultApiErrorFilter,
});
