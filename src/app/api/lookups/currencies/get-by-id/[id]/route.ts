import { NextResponse } from 'next/server';
import { getItem } from '../../../../../../server/shared/utils/get-item.util';
import { Currency } from '../../../../../../common/records/currencies.record';
import { createRoute } from '../../../../../../server/shared/utils/create-route.util';
import { getDefaultApiErrorFilter } from '../../../../../../server/shared/filter/get-api-error-filter.util';
import { getIntegerParamPipe } from '../../../../../../server/shared/pipes/get-integer-param.pipe';

export const GET = createRoute({
  paramsTransformers: (context) => ({
    id: getIntegerParamPipe(context.id, 1),
  }),
  execute: async ({ params: { id } }) => {
    return NextResponse.json({
      status: 200,
      data: await getItem<Currency, 'id'>('currencies.json', 'id', id),
    });
  },
  filter: getDefaultApiErrorFilter,
});
