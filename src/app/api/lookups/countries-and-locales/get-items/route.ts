import { NextResponse } from 'next/server';
import { CountriesAndLocalesSchema } from '../shared/schemas/countries-and-locales.schema';
import { createRoute } from '../../../../../server/shared/utils/create-route.util';
import { getCountriesAndLocalesFilters } from '../shared/utils/get-countries-filters.util';
import { getDefaultApiErrorFilter } from '../../../../../server/shared/filter/get-api-error-filter.util';
import { countryRepository } from '../../../../../server/entities/country/infrastructure/country.repository';

export const POST = createRoute({
  transformers: (_, body) => getCountriesAndLocalesFilters(body),
  schema: CountriesAndLocalesSchema.itemsSchema,
  execute: async ({ transformers, body }) => {
    return NextResponse.json({
      status: 200,
      data: await countryRepository.getItems(body.from, body.to, transformers),
    });
  },
  filter: getDefaultApiErrorFilter,
});