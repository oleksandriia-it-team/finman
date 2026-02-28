import { NextResponse } from 'next/server';
import { getTotalCountItems } from '../../../../../server/shared/utils/get-total-count-items.util';
import { CurrenciesSchema } from '../shared/schemas/currencies.schema';
import { Currency } from '../../../../../common/records/currencies.record';
import { createRoute } from '../../../../../server/shared/utils/create-route.util';
import { getCurrencyFilters } from '../shared/utils/get-currency-filters.util';
import { getDefaultApiErrorFilter } from '../../../../../server/shared/filter/get-api-error-filter.util';

export const POST = createRoute({
  transformers: (_, body) => getCurrencyFilters(body),
  schema: CurrenciesSchema.totalCountSchema,
  execute: async ({ transformers }) => {
    return NextResponse.json({
      status: 200,
      data: await getTotalCountItems<Currency>('currencies.json', transformers),
    });
  },
  filter: getDefaultApiErrorFilter,
});
