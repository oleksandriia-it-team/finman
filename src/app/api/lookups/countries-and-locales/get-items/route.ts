import { CountriesAndLocalesSchema } from '../shared/schemas/countries-and-locales.schema';
import { createRoute } from '@backend/shared/utils/create-route.util';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { countryRepository } from '@backend/entities/country/infrastructure/country.repository';

export const POST = createRoute({
  schema: CountriesAndLocalesSchema.itemsSchema,
  execute: async ({ body }) => {
    return {
      status: 200,
      data: await countryRepository.getItems(body.from, body.to, body.filters),
    };
  },
  filter: getDefaultApiErrorFilter,
});
