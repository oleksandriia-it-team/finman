import { NextResponse } from 'next/server';
import { getPaginatedItems } from '../../../../../server/shared/utils/get-paginated-items.util';
import { Currency } from '../../../../../common/records/currencies.record';
import { CurrenciesSchema } from '../shared/schemas/currencies.schema';
import { createRoute } from '../../../../../server/shared/utils/create-route.util';
import { getCurrencyFilters } from '../shared/utils/get-currency-filters.util';
import { getDefaultApiErrorFilter } from '../../../../../server/shared/filter/get-api-error-filter.util';

export const POST = createRoute({
  transformers: (_, body) => getCurrencyFilters(body),
  schema: CurrenciesSchema.itemsSchema,
  execute: async ({ transformers, body }) => {
    return NextResponse.json({
      status: 200,
      data: await getPaginatedItems<Currency>('currencies.json', body.from, body.to, transformers),
    });
  },
  filter: getDefaultApiErrorFilter,
});
