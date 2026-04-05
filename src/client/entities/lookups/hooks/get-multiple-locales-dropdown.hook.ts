import { useDropdownResource } from '@frontend/shared/hooks/dropdown-resource/dropdown-resource.hook';
import { lookupsService } from '@frontend/entities/lookups/lookups.service';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import { useQuery } from '@tanstack/react-query';
import { CountryAndLocale } from '@common/records/countries.record';
import { DropdownOption } from '@frontend/shared/models/dropdown-option.model';
import { useRef, useState } from 'react';

function transformLocalesToOptions(locales: CountryAndLocale[]): DropdownOption<number>[] {
  return locales.map((locale) => ({ value: locale.id, label: locale.locale }));
}

export function useGetMultipleLocalesDropdown(currentIds?: number[]) {
  const [search, setSearch] = useState<string>('');

  currentIds = currentIds ?? [];

  const querySearch = useRef<string>(search);

  const resource = useDropdownResource<number, true>({
    multiple: true,
    currentValue: currentIds,
    getOptionsQuery: useQuery({
      queryKey: ['get locale search', querySearch.current.trim()],
      queryFn: () =>
        lookupsService.getItems(LookupsTypeEnum.CountriesAndLocales, 1, 10, { locale: querySearch.current.trim() }),
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

  if (!resource.inputLabel?.length || resource.inputLabel[resource.inputLabel.length - 1].label !== search) {
    querySearch.current = search;
  }

  return {
    ...resource,
    search,
    setSearch,
  };
}
