import { NextResponse } from 'next/server';
import { getZodErrorMessage } from '../../shared/utils/get-zod-error-message.util';
import { DatabaseResultOperation } from '../../../../../shared/models/database-result-operation.model';
import { getApiErrorMessage } from '../../shared/utils/get-api-error-message.util';
import { getItem } from '../../shared/utils/get-item.util';
import { GetByCountryAndLocalesPayload } from '../shared/models/country-and-locales-payloads.model';
import { CountryAndLocale } from '../shared/models/countries-and-locales.model';
import { CountriesAndLocalesSchema } from '../shared/schemas/countries-and-locales.schema';

export default async function POST(request: Request): Promise<NextResponse<DatabaseResultOperation<CountryAndLocale | null>>> {
  try {
    const body: GetByCountryAndLocalesPayload = await request.json();

    const result = CountriesAndLocalesSchema.getByIdSchema.safeParse(body);

    if(!result.success) {
      return NextResponse.json(getZodErrorMessage(result));
    }

    return NextResponse.json({
      status: 200,
      data: await getItem<CountryAndLocale>(
        'countries-and-locales.json',
        'id',
        body.id
      )
    })
  }
  catch (err: unknown) {
    return NextResponse.json(getApiErrorMessage(err));
  }


}