import { NextResponse } from 'next/server';
import { getZodErrorMessage } from '../../shared/utils/get-zod-error-message.util';
import { DatabaseResultOperation } from '../../../../../shared/models/database-result-operation.model';
import { getApiErrorMessage } from '../../shared/utils/get-api-error-message.util';
import { getItem } from '../../shared/utils/get-item.util';
import { Currencies } from '../shared/models/currencies.model';
import { CurrenciesSchema } from '../shared/schemas/currencies.schema';
import { GetByCurrenciesPayload } from '../shared/models/currencies-payloads.model';

export async function POST(request: Request): Promise<NextResponse<DatabaseResultOperation<Currencies | null>>> {
  try {
    const body: GetByCurrenciesPayload = await request.json();

    const result = CurrenciesSchema.getByIdSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(getZodErrorMessage(result));
    }

    return NextResponse.json({
      status: 200,
      data: await getItem<Currencies, 'id'>(
        'currencies.json',
        'id',
        body.id
      )
    });
  } catch ( err: unknown ) {
    return NextResponse.json(getApiErrorMessage(err));
  }


}