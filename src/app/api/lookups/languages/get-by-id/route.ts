import { LanguagesSchema } from '../shared/schemas/languages.schema';
import { GetByLanguagePayload } from '../shared/models/language-payloads.model';
import { NextResponse } from 'next/server';
import { getZodErrorMessage } from '../../shared/utils/get-zod-error-message.util';
import { DatabaseResultOperation } from '../../../../../shared/models/database-result-operation.model';
import { getApiErrorMessage } from '../../shared/utils/get-api-error-message.util';
import { Language } from '../shared/models/languages.model';
import { getItem } from '../../shared/utils/get-item.util';

export async function POST(request: Request): Promise<NextResponse<DatabaseResultOperation<Language | null>>> {
  try {
    const body: GetByLanguagePayload = await request.json();

    const result = LanguagesSchema.getByIdSchema.safeParse(body);

    if(!result.success) {
      return NextResponse.json(getZodErrorMessage(result));
    }

    return NextResponse.json({
      status: 200,
      data: await getItem<Language>(
        'languages.json',
        'id',
        body.id
      )
    })
  }
  catch (err: unknown) {
    return NextResponse.json(getApiErrorMessage(err));
  }


}