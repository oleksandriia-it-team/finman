import { LanguagesSchema } from '../shared/schemas/languages.schema';
import { NextResponse } from 'next/server';
import { Language } from '../../../../../common/records/languages.record';
import { getItem } from '../../../../../server/shared/utils/get-item.util';
import { createRoute } from '../../../../../server/shared/utils/create-route.util';
import { getDefaultApiErrorFilter } from '../../../../../server/shared/filter/get-api-error-filter.util';

export const POST = createRoute({
  execute: async ({ body }) => {
    return NextResponse.json({
      status: 200,
      data: await getItem<Language, 'id'>('languages.json', 'id', body.id),
    });
  },
  schema: LanguagesSchema.getByIdSchema,
  filter: getDefaultApiErrorFilter,
});
