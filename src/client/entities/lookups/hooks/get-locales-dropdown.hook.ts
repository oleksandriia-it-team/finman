import { useDropdownResource } from '@frontend/shared/hooks/dropdown-resource/dropdown-resource.hook';
import { lookupsService } from '@frontend/entities/lookups/lookups.service';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import { useQuery } from '@tanstack/react-query';
import { CountryAndLocale } from '@common/records/countries.record';
import { DropdownOption } from '@frontend/shared/models/dropdown-option.model';
import { isEmpty } from '@common/utils/is-empty.util';
import { useState } from 'react';

function transformLocalesToOptions(locales: CountryAndLocale[]): DropdownOption<string>[] {
  return locales.map((locale) => ({ value: locale.locale, label: locale.locale }));
}

export function useGetLocalesDropdown(currentValue?: string) {
  const [search, setSearch] = useState<string>('');

  currentValue = currentValue ?? '';

  const resource = useDropdownResource<string>({
    currentValue: currentValue,
    getOptionsQuery: useQuery({
      queryKey: ['get locale search', search.trim()],
      queryFn: () =>
        lookupsService
          .getItems(LookupsTypeEnum.CountriesAndLocales, 1, 10, { locale: search.trim() })
          .then(transformLocalesToOptions),
    }),
    getLabelFn: (locale) => {
      if (isEmpty(locale)) {
        return Promise.resolve('');
      }
      return lookupsService
        .getItems(LookupsTypeEnum.CountriesAndLocales, 1, 2, { locale: locale.trim() })
        .then((r) => r.find((l) => l.locale === locale)?.locale ?? '');
    },
    labelQueryKey: ['get locale label', currentValue.trim()],
  });

  return {
    ...resource,
    search,
    setSearch,
  };
}
