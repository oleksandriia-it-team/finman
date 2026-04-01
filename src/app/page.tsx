'use client';

import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import { FinDropdown } from '@frontend/components/fields/fin-dropdown/fin-dropdown';
import { lookupsService } from '@frontend/entities/lookups/lookups.service';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { useDropdownResource } from '@frontend/shared/hooks/dropdown-resource/dropdown-resource.hook';
import { UiInput } from '@frontend/ui/ui-input/ui-input';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function MainPage() {
  const [page, setPage] = useState(1);

  const [firstDropdownValue, setFirstDropdownValue] = useState<number | undefined>(undefined);
  const [inputValue, setInputValue] = useState<string | undefined>(undefined);

  const data = useDropdownResource({
    currentValue: firstDropdownValue,
    getTotalCountQuery: useQuery({
      queryKey: ['total count country'],
      queryFn: () => lookupsService.getTotalCount(LookupsTypeEnum.CountriesAndLocales, {}),
    }),
    getLabelFn: (id) => lookupsService.getItem(LookupsTypeEnum.CountriesAndLocales, id).then((r) => r?.country),
    getOptionsQuery: useQuery({
      queryKey: ['options country', page],
      queryFn: () =>
        lookupsService
          .getItems(LookupsTypeEnum.CountriesAndLocales, (page - 1) * 20 + 1, page * 20 + 1, {})
          .then((r) => r.map((data) => ({ label: data.country, value: data.id }))),
    }),
    labelQueryKey: ['label country', String(firstDropdownValue ?? '')],
  });

  // TODO: remove later, it's an example
  return (
    <div className="flex gap-2">
      <FinDropdown<number>
        lazy={true}
        className="w-24"
        optionListClassName="overflow-auto max-h-96"
        total={data.totalCount}
        isLoading={data.state === PromiseState.Loading}
        pageSize={20}
        page={page}
        itemHeight={32}
        setPage={setPage}
        value={firstDropdownValue}
        customInputValue={data.inputLabel}
        options={data.options}
        onChange={(value) => setFirstDropdownValue(value)}
      />

      <UiInput
        onChange={setInputValue}
        value={inputValue}
      />
    </div>
  );
}
