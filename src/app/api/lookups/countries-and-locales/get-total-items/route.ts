import { NextResponse } from 'next/server';
import { CountriesAndLocalesSchema } from '../shared/schemas/countries-and-locales.schema';
import { createRoute } from '../../../../../server/shared/utils/create-route.util';
import { getCountriesAndLocalesFilters } from '../shared/utils/get-countries-filters.util';
import { countryRepository } from '../../../../../server/entities/country/infrastructure/country.repository';
import { getDefaultApiErrorFilter } from '../../../../../server/shared/filter/get-api-error-filter.util';

export const POST = createRoute({
  transformers: (_, body) => getCountriesAndLocalesFilters(body),
  schema: CountriesAndLocalesSchema.totalCountSchema,
  execute: async ({ transformers }) => {
    return NextResponse.json({
      status: 200,
      data: await countryRepository.getTotalCount(transformers),
    });
  },
  filter: getDefaultApiErrorFilter,
});
