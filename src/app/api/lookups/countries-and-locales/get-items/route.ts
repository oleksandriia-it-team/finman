import { NextResponse } from 'next/server';
import { CountriesAndLocalesSchema } from '../shared/schemas/countries-and-locales.schema';
import { createRoute } from '../../../../../server/shared/utils/create-route.util';
import { getDefaultApiErrorFilter } from '../../../../../server/shared/filter/get-api-error-filter.util';
import { countryRepository } from '../../../../../server/entities/country/infrastructure/country.repository';

export const POST = createRoute({
  schema: CountriesAndLocalesSchema.itemsSchema,
  execute: async ({ body }) => {
    return NextResponse.json({
      status: 200,
      data: await countryRepository.getItems(body.from, body.to, body.filters),
    });
  },
  filter: getDefaultApiErrorFilter,
});
