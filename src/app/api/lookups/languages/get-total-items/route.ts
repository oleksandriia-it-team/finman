import { LanguagesSchema } from '../shared/schemas/languages.schema';
import { Language } from '../../../../../common/records/languages.record';
import { createRoute } from '../../../../../server/shared/utils/create-route.util';
import { getDefaultApiErrorFilter } from '../../../../../server/shared/filter/get-api-error-filter.util';
import { NextResponse } from 'next/server';
import { getTotalCountItems } from '../../../../../server/shared/utils/get-total-count-items.util';
import { getLanguageFilters } from '../shared/utils/get-language-filters.util';

export const POST = createRoute({
  execute: async ({ body }) => {
    return NextResponse.json({
      status: 200,
      data: await getTotalCountItems<Language>('languages.json', getLanguageFilters(body)),
    });
  },
  schema: LanguagesSchema.totalCountSchema,
  filter: getDefaultApiErrorFilter,
});
