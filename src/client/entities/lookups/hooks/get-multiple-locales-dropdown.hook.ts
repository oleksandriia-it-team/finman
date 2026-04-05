import { useDropdownResource } from '@frontend/shared/hooks/dropdown-resource/dropdown-resource.hook';
import { lookupsService } from '@frontend/entities/lookups/lookups.service';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import { useQuery } from '@tanstack/react-query';
import { CountryAndLocale } from '@common/records/countries.record';
import { DropdownOption } from '@frontend/shared/models/dropdown-option.model';
import { useState } from 'react';

function transformLocalesToOptions(locales: CountryAndLocale[]): DropdownOption<number>[] {
  return locales.map((locale) => ({ value: locale.id, label: locale.locale }));
}

export function useGetMultipleLocalesDropdown(currentIds?: number[]) {
  const [search, setSearch] = useState<string>('');

  currentIds = currentIds ?? [];

  const resource = useDropdownResource<number, true>({
    multiple: true,
    currentValue: currentIds,
    getOptionsQuery: useQuery({
      queryKey: ['get locale search', search.trim()],
      queryFn: () => lookupsService.getItems(LookupsTypeEnum.CountriesAndLocales, 1, 10, { locale: search.trim() }),
      select: transformLocalesToOptions,
    }),
    getLabelFn: (ids) => {
      if (!ids.length) {
        return Promise.resolve([]);
      }
      return lookupsService
        .getItems(LookupsTypeEnum.CountriesAndLocales, 1, ids.length + 1, { ids })
        .then(transformLocalesToOptions);
    },
    labelQueryKey: ['get locale label', currentIds.sort().join(',')],
  });

  return {
    ...resource,
    search,
    setSearch,
  };
}
