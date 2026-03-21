import { NextResponse } from 'next/server';
import { CurrenciesSchema } from '../shared/schemas/currencies.schema';
import { createRoute } from '@backend/shared/utils/create-route.util';
import { getDefaultApiErrorFilter } from '@backend/shared/filter/get-api-error-filter.util';
import { currencyRepository } from '@backend/entities/currency/infrastructure/currency.repository';

export const POST = createRoute({
  schema: CurrenciesSchema.totalCountSchema,
  execute: async ({ body }) => {
    return NextResponse.json({
      status: 200,
      data: await currencyRepository.getTotalCount(body.filters),
    });
  },
  filter: getDefaultApiErrorFilter,
});
