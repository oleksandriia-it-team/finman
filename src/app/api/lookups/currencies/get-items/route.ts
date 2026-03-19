import { NextResponse } from 'next/server';
import { CurrenciesSchema } from '../shared/schemas/currencies.schema';
import { createRoute } from '../../../../../server/shared/utils/create-route.util';
import { getDefaultApiErrorFilter } from '../../../../../server/shared/filter/get-api-error-filter.util';
import { currencyRepository } from '../../../../../server/entities/currency/infrastructure/currency.repository';

export const POST = createRoute({
  schema: CurrenciesSchema.itemsSchema,
  execute: async ({ body }) => {
    return NextResponse.json({
      status: 200,
      data: await currencyRepository.getItems(body.from, body.to, body.filters),
    });
  },
  filter: getDefaultApiErrorFilter,
});
