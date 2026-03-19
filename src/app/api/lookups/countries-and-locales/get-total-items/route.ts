import { NextResponse } from 'next/server';
import { CountriesAndLocalesSchema } from '../shared/schemas/countries-and-locales.schema';
import { createRoute } from '../../../../../server/shared/utils/create-route.util';
import { countryRepository } from '../../../../../server/entities/country/infrastructure/country.repository';
import { getDefaultApiErrorFilter } from '../../../../../server/shared/filter/get-api-error-filter.util';

export const POST = createRoute({
  schema: CountriesAndLocalesSchema.totalCountSchema,
  execute: async ({ body }) => {
    return NextResponse.json({
      status: 200,
      data: await countryRepository.getTotalCount(body.filters),
    });
  },
  filter: getDefaultApiErrorFilter,
});
