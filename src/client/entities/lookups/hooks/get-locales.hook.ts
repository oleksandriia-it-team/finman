import { useDropdownResource } from '@frontend/shared/hooks/dropdown-resource/dropdown-resource.hook';
import { lookupsService } from '@frontend/entities/lookups/lookups.service';
import { useState } from 'react';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import { useQuery } from '@tanstack/react-query';
import { CountryAndLocale } from '@common/records/countries.record';
import { DropdownOption } from '@frontend/shared/models/dropdown-option.model';

function transformLocalesToOptions(locales: CountryAndLocale[]): DropdownOption<number>[] {
  return locales.map((locale) => ({ value: locale.id, label: locale.locale }));
}

export function useGetLocales(id?: number) {
  const [search, setSearch] = useState<string | undefined>('');

  const resource = useDropdownResource<number>({
    currentValue: id,
    getOptionsQuery: useQuery({
      queryKey: ['get locale search', search],
      queryFn: () =>
        lookupsService
          .getItems(LookupsTypeEnum.CountriesAndLocales, 1, 10, { locale: search ?? '' })
          .then(transformLocalesToOptions),
    }),
    getLabelFn: (id) => lookupsService.getItem(LookupsTypeEnum.CountriesAndLocales, id).then((r) => r?.locale),
    labelQueryKey: ['get locale label', String(id ?? '')],
  });

  return {
    search,
    setSearch,
    resource,
  };
}
