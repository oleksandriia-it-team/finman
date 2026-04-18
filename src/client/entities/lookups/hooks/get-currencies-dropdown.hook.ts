import { useCallback, useRef, useState } from 'react';
import { isEmpty } from '@common/utils/is-empty.util';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import { lookupsService } from '@frontend/entities/lookups/lookups.service';
import { useQuery } from '@tanstack/react-query';
import { useOptionsResource } from '@frontend/shared/hooks/options-resource/options-resource.hook';
import type { DropdownOption } from '@frontend/shared/models/dropdown-option.model';
import type { Currency } from '@common/records/currencies.record';

function transformCurrenciesToOptions(currencies: Currency[]): DropdownOption<string>[] {
  return currencies.map((currency) => ({
    value: currency.currencyCode,
    label: `${currency.currencyName} (${currency.currencyCode})`,
  }));
}

export function useGetCurrenciesDropdown(currentValue?: string) {
  const [search, setSearch] = useState<string>('');
  currentValue = currentValue ?? '';

  const querySearch = useRef<string>(search);
  if (currentValue !== search) {
    querySearch.current = search;
  }

  const normalizedQuerySearch = querySearch.current.trim();

  const resource = useOptionsResource<string>({
    currentValue: currentValue,
    getOptionsQuery: useQuery({
      queryKey: ['get currency search', normalizedQuerySearch],
      queryFn: () =>
        lookupsService.getItems(LookupsTypeEnum.Currency, 1, 10, {
          code: normalizedQuerySearch,
        }),
      select: transformCurrenciesToOptions,
    }),
    getLabelFn: async (code) => {
      if (isEmpty(code)) return undefined;

      const result = await lookupsService
        .getItems(LookupsTypeEnum.Currency, 1, 2, { code: code.trim() })
        .then((r) => r.find((c) => c.currencyCode === code));

      if (isEmpty(result)) return undefined;

      return {
        value: result.currencyCode,
        label: result.currencyCode,
      };
    },
    onGetLabel: useCallback(
      ({ label }) => {
        setSearch(label);
      },
      [setSearch],
    ),
    labelQueryKey: ['get currency multiple label', currentValue.trim()],
  });

  return {
    ...resource,
    search,
    setSearch,
  };
}
