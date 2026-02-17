import { LanguagesSchema } from '../shared/schemas/languages.schema';
import { NextResponse } from 'next/server';
import { Language } from '../../../../../common/records/languages.record';
import { getPaginatedItems } from '../../../../../server/shared/utils/get-paginated-items.util';
import { createRoute } from '../../../../../server/shared/utils/create-route.util';
import { getDefaultApiErrorFilter } from '../../../../../server/shared/filter/get-api-error-filter.util';
import { getLanguageFilters } from '../shared/utils/get-language-filters.util';

export const POST = createRoute({
  execute: async ({ body }) => {
    return NextResponse.json({
      status: 200,
      data: await getPaginatedItems<Language>('languages.json', body.from, body.to, getLanguageFilters(body)),
    });
  },
  schema: LanguagesSchema.itemsSchema,
  filter: getDefaultApiErrorFilter,
});
