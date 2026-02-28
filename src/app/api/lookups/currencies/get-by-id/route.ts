import { NextResponse } from 'next/server';
import { getItem } from '../../../../../server/shared/utils/get-item.util';
import { Currency } from '../../../../../common/records/currencies.record';
import { CurrenciesSchema } from '../shared/schemas/currencies.schema';
import { createRoute } from '../../../../../server/shared/utils/create-route.util';
import { getDefaultApiErrorFilter } from '../../../../../server/shared/filter/get-api-error-filter.util';

export const POST = createRoute({
  schema: CurrenciesSchema.getByIdSchema,
  execute: async ({ body }) => {
    return NextResponse.json({
      status: 200,
      data: await getItem<Currency, 'id'>('currencies.json', 'id', body.id),
    });
  },
  filter: getDefaultApiErrorFilter,
});
