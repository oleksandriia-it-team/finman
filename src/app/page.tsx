'use client';

import { useState } from 'react';
import Dropdown from '../client/shared/сomponents/fields/dropdown/dropdown';
import { lookupsService } from '../client/api-clients/lookups/lookups.service';
import { LookupsTypeEnum } from '../server/shared/enums/lookups-type.enum';
import { useQuery } from '@tanstack/react-query';
import { useDropdownResource } from '../client/shared/hooks/dropdown-resource/dropdown-resource.hook';
import { PromiseState } from '../client/shared/enums/promise-state.enum';

export default function MainPage() {
  const [page, setPage] = useState(1);

  const [firstDropdownValue, setFirstDropdownValue] = useState<number | undefined>(undefined);

  const data = useDropdownResource({
    currentValue: firstDropdownValue,
    getTotalCountQuery: useQuery({
      queryKey: ['total count country'],
      queryFn: () => lookupsService.getTotalCount(LookupsTypeEnum.CountriesAndLocales, {}).then((r) => r.data),
    }),
    getLabelFn: (id) => lookupsService.getItem(LookupsTypeEnum.CountriesAndLocales, id).then((r) => r.data?.country),
    getOptionsQuery: useQuery({
      queryKey: ['options country', page],
      queryFn: () =>
        lookupsService
          .getItems(LookupsTypeEnum.CountriesAndLocales, (page - 1) * 20 + 1, page * 20 + 1, {})
          .then((r) => r.data.map((data) => ({ label: data.country, value: data.id }))),
    }),
    labelQueryKey: ['label country', String(firstDropdownValue ?? '')],
  });

  // TODO: remove later, it's an example
  return (
    <div className="flex gap-2">
      <Dropdown<number>
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
    </div>
  );
}
