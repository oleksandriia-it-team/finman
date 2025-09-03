import { NextResponse } from 'next/server';
import { getZodErrorMessage } from '../../shared/utils/get-zod-error-message.util';
import { DatabaseResultOperation } from '../../../../../shared/models/database-result-operation.model';
import { getApiErrorMessage } from '../../shared/utils/get-api-error-message.util';
import { getPaginatedItems } from '../../shared/utils/get-paginated-items.util';
import { Currency } from '../shared/models/currencies.model';
import { GetCurrenciesPayload } from '../shared/models/currencies-payloads.model';
import { CurrenciesSchema } from '../shared/schemas/currencies.schema';

export async function POST(request: Request): Promise<NextResponse<DatabaseResultOperation<Currency[]>>> {
  try {
    const body: GetCurrenciesPayload = await request.json();

    const result = CurrenciesSchema.itemsSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(getZodErrorMessage(result));
    }

    const { ids, excludeIds, code, name, symbol } = body.filters ?? {};

    const emptyFilter = () => true;

    const idsFilter = ids ? (value: Currency) => ids.includes(value.id) : emptyFilter;
    const excludeIdsFilter = excludeIds ? (value: Currency) => !excludeIds.includes(value.id) : emptyFilter;
    const codeFilter = code ? (value: Currency) => !code.includes(value.currencyCode) : emptyFilter;
    const nameFilter = name ? (value: Currency) => name.includes(value.currencyName) : emptyFilter;
    const symbolFilter = symbol ? (value: Currency) => symbol.includes(value.currencySymbol) : emptyFilter;
    return NextResponse.json({
      status: 200,
      data: await getPaginatedItems<Currency>(
        'currencies.json',
        body.from,
        body.to,
        [ idsFilter, excludeIdsFilter, codeFilter, nameFilter, symbolFilter ].filter((fn) => fn !== emptyFilter)
      )
    });
  } catch ( err: unknown ) {
    return NextResponse.json(getApiErrorMessage(err));
  }


}