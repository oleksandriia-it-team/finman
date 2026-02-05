import { LanguagesSchema } from '../shared/schemas/languages.schema';
import { GetByLanguagePayload } from '../shared/models/language-payloads.model';
import { NextResponse } from 'next/server';
import { getZodErrorMessage } from '../../../../../server/shared/utils/get-zod-error-message.util';
import { ApiResultOperation } from '../../../../../common/models/api-result-operation.model';
import { getApiErrorMessage } from '../../../../../server/shared/utils/get-api-error-message.util';
import { Language } from '../../../../../common/records/languages.record';
import { getItem } from '../../../../../server/shared/utils/get-item.util';

export async function POST(request: Request): Promise<NextResponse<ApiResultOperation<Language | null>>> {
  try {
    const body: GetByLanguagePayload = await request.json();

    const result = LanguagesSchema.getByIdSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(getZodErrorMessage(result));
    }

    return NextResponse.json({
      status: 200,
      data: await getItem<Language, 'id'>('languages.json', 'id', body.id),
    });
  } catch (err: unknown) {
    return NextResponse.json(getApiErrorMessage(err));
  }
}
