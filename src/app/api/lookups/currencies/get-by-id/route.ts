import { NextResponse } from 'next/server';
import { getZodErrorMessage } from '../../../../../server/shared/utils/get-zod-error-message.util';
import { ApiResultOperation } from '../../../../../common/models/api-result-operation.model';
import { getApiErrorMessage } from '../../../../../server/shared/utils/get-api-error-message.util';
import { getItem } from '../../../../../server/shared/utils/get-item.util';
import { Currency } from '../../../../../common/records/currencies.record';
import { CurrenciesSchema } from '../shared/schemas/currencies.schema';
import { GetByCurrenciesPayload } from '../shared/models/currencies-payloads.model';

export async function POST(request: Request): Promise<NextResponse<ApiResultOperation<Currency | null>>> {
  try {
    const body: GetByCurrenciesPayload = await request.json();

    const result = CurrenciesSchema.getByIdSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(getZodErrorMessage(result));
    }

    return NextResponse.json({
      status: 200,
      data: await getItem<Currency, 'id'>('currencies.json', 'id', body.id),
    });
  } catch (err: unknown) {
    return NextResponse.json(getApiErrorMessage(err));
  }
}
