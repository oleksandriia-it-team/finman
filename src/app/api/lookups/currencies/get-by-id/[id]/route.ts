import { NextResponse } from 'next/server';
import { createRoute } from '../../../../../../server/shared/utils/create-route.util';
import { getDefaultApiErrorFilter } from '../../../../../../server/shared/filter/get-api-error-filter.util';
import { getIntegerParamPipe } from '../../../../../../server/shared/pipes/get-integer-param.pipe';
import { currencyRepository } from '../../../../../../server/entities/currency/infrastructure/currency.repository';

export const GET = createRoute({
  paramsTransformers: (context) => ({
    id: getIntegerParamPipe(context.id, 1),
  }),
  execute: async ({ params: { id } }) => {
    return NextResponse.json({
      status: 200,
      data: await currencyRepository.getItemById(id),
    });
  },
  filter: getDefaultApiErrorFilter,
});
