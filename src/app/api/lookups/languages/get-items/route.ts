import { LanguagesSchema } from '../shared/schemas/languages.schema';
import { NextResponse } from 'next/server';
import { getApiErrorMessage } from '../../../../../server/shared/utils/get-api-error-message.util';
import { Language } from '../../../../../common/records/languages.record';
import { getPaginatedItems } from '../../../../../server/shared/utils/get-paginated-items.util';
import { createRoute } from '../../../../../server/shared/utils/create-route.util';

export const POST = createRoute({
  execute: async ({ body }) => {
    const { ids, excludeIds, name } = body.filters ?? {};

    const emptyFilter = () => true;

    const idsFilter = ids ? (value: Language) => ids.includes(value.id) : emptyFilter;
    const excludeIdsFilter = excludeIds ? (value: Language) => !excludeIds.includes(value.id) : emptyFilter;
    const nameFilter = name ? (value: Language) => value.name.includes(name) : emptyFilter;

    return NextResponse.json({
      status: 200,
      data: await getPaginatedItems<Language>(
        'languages.json',
        body.from,
        body.to,
        [idsFilter, excludeIdsFilter, nameFilter].filter((fn) => fn !== emptyFilter),
      ),
    });
  },
  schema: LanguagesSchema.itemsSchema,
  filter: (e) => NextResponse.json(getApiErrorMessage(e), { status: 500 }),
});
