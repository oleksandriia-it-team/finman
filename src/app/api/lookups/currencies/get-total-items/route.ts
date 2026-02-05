import { NextResponse } from 'next/server';
import { getZodErrorMessage } from '../../../../../server/shared/utils/get-zod-error-message.util';
import { ApiResultOperation } from '../../../../../common/models/api-result-operation.model';
import { getApiErrorMessage } from '../../../../../server/shared/utils/get-api-error-message.util';
import { getTotalCountItems } from '../../../../../server/shared/utils/get-total-count-items.util';
import { GetTotalCurrenciesPayload } from '../shared/models/currencies-payloads.model';
import { CurrenciesSchema } from '../shared/schemas/currencies.schema';
import { Currency } from '../shared/models/currencies.model';

export async function POST(request: Request): Promise<NextResponse<ApiResultOperation<number>>> {
  try {
    const body: GetTotalCurrenciesPayload = await request.json();

    const result = CurrenciesSchema.totalCountSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(getZodErrorMessage(result));
    }

    const { ids, excludeIds, code, name, symbol } = body.filters ?? {};

    const emptyFilter = () => true;

    const idsFilter = ids ? (value: Currency) => ids.includes(value.id) : emptyFilter;
    const excludeIdsFilter = excludeIds ? (value: Currency) => !excludeIds.includes(value.id) : emptyFilter;
    const codeFilter = code ? (value: Currency) => value.currencyCode.includes(code) : emptyFilter;
    const nameFilter = name ? (value: Currency) => value.currencyName.includes(name) : emptyFilter;
    const symbolFilter = symbol ? (value: Currency) => value.currencySymbol.includes(symbol) : emptyFilter;

    return NextResponse.json({
      status: 200,
      data: await getTotalCountItems<Currency>(
        'currencies.json',
        [idsFilter, excludeIdsFilter, codeFilter, nameFilter, symbolFilter].filter((fn) => fn !== emptyFilter),
      ),
    });
  } catch (err: unknown) {
    return NextResponse.json(getApiErrorMessage(err));
  }
}
