import { useOptionsResource } from '@frontend/shared/hooks/options-resource/options-resource.hook';
import { lookupsService } from '@frontend/entities/lookups/lookups.service';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import { useQuery } from '@tanstack/react-query';
import { type CountryAndLocale } from '@common/records/countries.record';
import { type DropdownOption } from '@frontend/shared/models/dropdown-option.model';
import { isEmpty } from '@common/utils/is-empty.util';
import { useCallback, useLayoutEffect, useState } from 'react';

function transformLocalesToOptions(locales: CountryAndLocale[]): DropdownOption<string>[] {
  return locales.map((locale) => ({ value: locale.locale, label: locale.country }));
}

export function useGetLocalesDropdown(currentValue?: string) {
  const [search, setSearch] = useState<string>('');

  currentValue = currentValue ?? '';

  const [querySearch, setQuerySearch] = useState<string>(search);

  const normalizedQuerySearch = querySearch.trim();

  const resource = useOptionsResource<string>({
    currentValue: currentValue,
    getOptionsQuery: useQuery({
      queryKey: ['get locale search', normalizedQuerySearch],
      queryFn: () =>
        lookupsService.getItems(LookupsTypeEnum.CountriesAndLocales, 1, 10, { locale: normalizedQuerySearch }),
      select: transformLocalesToOptions,
    }),
    getLabelFn: async (locale) => {
      if (isEmpty(locale)) {
        return undefined;
      }
      const result = await lookupsService
        .getItems(LookupsTypeEnum.CountriesAndLocales, 1, 2, { locale: locale.trim() })
        .then((r) => r.find((l) => l.locale === locale));

      if (isEmpty(result)) {
        return undefined;
      }

      return {
        value: result.locale,
        label: result.country,
      };
    },
    onGetLabel: useCallback(
      ({ label }) => {
        setSearch(label);
      },
      [setSearch],
    ),
    labelQueryKey: ['get locale multiple label', currentValue.trim()],
  });

  useLayoutEffect(() => {
    if (search !== resource.inputLabel?.label) {
      setQuerySearch(search);
    }
  }, [resource.inputLabel?.label, search]);

  return {
    ...resource,
    search,
    setSearch,
  };
}
