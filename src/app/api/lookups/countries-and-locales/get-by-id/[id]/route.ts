import { NextResponse } from 'next/server';
import { getItem } from '../../../../../../server/shared/utils/get-item.util';
import { createRoute } from '../../../../../../server/shared/utils/create-route.util';
import { getIntegerParamPipe } from '../../../../../../server/shared/pipes/get-integer-param.pipe';
import { getDefaultApiErrorFilter } from '../../../../../../server/shared/filter/get-api-error-filter.util';
import { CountryAndLocale } from '../../../../../../common/records/countries.record';

export const GET = createRoute({
  paramsTransformers: (context) => ({
    id: getIntegerParamPipe(context.id, 1),
  }),
  execute: async ({ params: { id } }) => {
    return NextResponse.json({
      status: 200,
      data: await getItem<CountryAndLocale, 'id'>('countries.json', 'id', id),
    });
  },
  filter: getDefaultApiErrorFilter,
});
