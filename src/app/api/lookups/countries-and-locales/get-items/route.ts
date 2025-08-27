import { NextResponse } from 'next/server';
import { getZodErrorMessage } from '../../shared/utils/get-zod-error-message.util';
import { DatabaseResultOperation } from '../../../../../shared/models/database-result-operation.model';
import { getApiErrorMessage } from '../../shared/utils/get-api-error-message.util';
import {
  GetCountryAndLocalesPayload,
} from '../shared/models/country-and-locales-payloads.model';
import { CountriesAndLocalesSchema } from '../shared/schemas/countries-and-locales.schema';
import { CountryAndLocale } from '../shared/models/countries-and-locales.model';
import { getPaginatedItems } from '../../shared/utils/get-paginated-items.util';

export async function POST(request: Request): Promise<NextResponse<DatabaseResultOperation<CountryAndLocale[]>>> {
  try {
    const body: GetCountryAndLocalesPayload = await request.json();

    const result = CountriesAndLocalesSchema.itemsSchema.safeParse(body);

    if(!result.success) {
      return NextResponse.json(getZodErrorMessage(result));
    }

    const { ids, excludeIds, country, locale } = body.filters ?? {};

    const emptyFilter = () => true;

    const idsFilter = ids ? (value: CountryAndLocale) => ids.includes(value.id) : emptyFilter;
    const excludeIdsFilter = excludeIds ? (value: CountryAndLocale) => !excludeIds.includes(value.id) : emptyFilter;
    const countryFilter = country ? (value: CountryAndLocale) => !country.includes(value.country) : emptyFilter;
    const localeFilter = locale ? (value: CountryAndLocale) => !locale.includes(value.locale) : emptyFilter;

    return NextResponse.json({
      status: 200,
      data: await getPaginatedItems<CountryAndLocale>(
        'countries-and-locales.json',
        body.from,
        body.to,
        [idsFilter, excludeIdsFilter, countryFilter, localeFilter].filter((fn) => fn !== emptyFilter)
      )
    })
  }
  catch (err: unknown) {
    return NextResponse.json(getApiErrorMessage(err));
  }


}