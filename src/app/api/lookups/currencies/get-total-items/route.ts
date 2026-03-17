import { NextResponse } from 'next/server';
import { CurrenciesSchema } from '../shared/schemas/currencies.schema';
import { createRoute } from '../../../../../server/shared/utils/create-route.util';
import { getCurrencyFilters } from '../shared/utils/get-currency-filters.util';
import { getDefaultApiErrorFilter } from '../../../../../server/shared/filter/get-api-error-filter.util';
import { currencyRepository } from '../../../../../server/entities/currency/infrastructure/currency.repository';

export const POST = createRoute({
  transformers: (_, body) => getCurrencyFilters(body),
  schema: CurrenciesSchema.totalCountSchema,
  execute: async ({ transformers }) => {
    return NextResponse.json({
      status: 200,
      data: await currencyRepository.getTotalCount(transformers),
    });
  },
  filter: getDefaultApiErrorFilter,
});
