import { LanguagesSchema } from '../shared/schemas/languages.schema';
import { GetTotalLanguagesPayload } from '../shared/models/language-payloads.model';
import { NextResponse } from 'next/server';
import { getZodErrorMessage } from '../../shared/utils/get-zod-error-message.util';
import { DatabaseResultOperation } from '../../../../../shared/models/database-result-operation.model';
import { getApiErrorMessage } from '../../shared/utils/get-api-error-message.util';
import { getTotalCountItems } from '../../shared/utils/get-total-count-items.util';
import { Language } from '../shared/models/languages.model';

export async function POST(request: Request): Promise<NextResponse<DatabaseResultOperation<number>>> {
  try {
    const body: GetTotalLanguagesPayload = await request.json();

    const result = LanguagesSchema.totalCountSchema.safeParse(body);

    if(!result.success) {
      return NextResponse.json(getZodErrorMessage(result));
    }

    const { ids, excludeIds, name } = body.filters ?? {};

    const emptyFilter = () => true;

    const idsFilter = ids ? (value: Language) => ids.includes(value.id) : emptyFilter;
    const excludeIdsFilter = excludeIds ? (value: Language) => !excludeIds.includes(value.id) : emptyFilter;
    const nameFilter = name ? (value: Language) => !name.includes(value.name) : emptyFilter;

    return NextResponse.json({
      status: 200,
      data: await getTotalCountItems<Language>(
        'languages.json',
        [idsFilter, excludeIdsFilter, nameFilter].filter((fn) => fn !== emptyFilter)
      )
    })
  }
  catch (err: unknown) {
    return NextResponse.json(getApiErrorMessage(err));
  }


}