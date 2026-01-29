'use client';

import { useMemo, useState } from 'react';
import Dropdown from '../client/shared/сomponents/fields/dropdown/dropdown';
import { lookupsService } from '../client/api-clients/lookups/lookups.service';
import { LookupsTypeEnum } from '../server/shared/enums/lookups-type.enum';
import { useResource } from '../client/shared/hooks/resource/resource.hook';

export default function MainPage() {
  const [page, setPage] = useState(1);

  const { from, to } = useMemo(() => ({ from: (page - 1) * 20 + 1, to: page * 20 + 1 }), [page]);

  const totalCount = useResource([], (signal) =>
    lookupsService.getTotalCount(LookupsTypeEnum.CountriesAndLocales, {}, signal),
  );

  const optionsResource = useResource([from, to], (signal, from, to) =>
    lookupsService.getItems(LookupsTypeEnum.CountriesAndLocales, from, to, {}, signal),
  );

  const options = useMemo(() => {
    return optionsResource.value?.data.map((data) => ({ value: data.id, label: data.country })) ?? [];
  }, [optionsResource.value]);

  const [firstDropdownValue, setFirstDropdownValue] = useState<number | undefined>(undefined);

  // TODO: remove later, it's an example
  return (
    <div className="flex gap-2">
      <Dropdown<number>
        lazy={true}
        className="w-24"
        optionListClassName="overflow-auto max-h-96"
        total={totalCount.value?.data ?? 0}
        isLoading={totalCount.isLoading || optionsResource.isLoading}
        pageSize={20}
        page={page}
        setPage={setPage}
        value={firstDropdownValue}
        options={options}
        onChange={(value) => setFirstDropdownValue(value)}
      />
    </div>
  );
}
