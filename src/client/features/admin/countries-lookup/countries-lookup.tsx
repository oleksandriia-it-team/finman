'use client';

import type { CountryAndLocale } from '@common/records/countries.record';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import { lookupsService } from '@frontend/entities/lookups/lookups.service';
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { LookupTable } from '@frontend/entities/lookups/lookup-table/lookup-table';
import { LookupTableRow } from '@frontend/entities/lookups/lookup-table/lookup-table-row';
import { LookupRowSkeleton } from '@frontend/entities/lookups/lookup-table/lookup-row-skeleton';
import { type LookupColumnDef } from '@frontend/entities/lookups/lookup-column/lookup-column.model';
import { useLookupSelection } from '../hooks/use-lookup-selection.hook';
import { useRouter } from 'next/navigation';

const PAGE_SIZE = 20;

const Columns: LookupColumnDef<CountryAndLocale>[] = [
  {
    header: 'Country',
    cellClassName: 'py-2 text-sm font-medium text-foreground',
    cell: (item) => item.country,
  },
  {
    header: 'Locale',
    cellClassName: 'py-2 text-sm text-muted-foreground',
    cell: (item) => item.locale,
  },
];

const skeletonWidths = ['w-32', 'w-24'];

function CountryRowSkeleton() {
  return <LookupRowSkeleton columnWidths={skeletonWidths} />;
}

export function CountriesLookup() {
  const router = useRouter();
  const { hasSelection, isSelected, toggleRow, clearSelection } = useLookupSelection();

  const { options, state, selectedPage, setPage, totalCount } = usePaginationResource<CountryAndLocale, object>({
    queryKey: ['admin', 'lookups', 'countries'],
    pageSize: PAGE_SIZE,
    getOptionsFn: (page) =>
      lookupsService.getItems(LookupsTypeEnum.CountriesAndLocales, (page - 1) * PAGE_SIZE + 1, page * PAGE_SIZE, {}),
    getTotalCountFn: () => lookupsService.getTotalCount(LookupsTypeEnum.CountriesAndLocales, {}),
  });

  function handleDelete() {
    console.warn('TODO: delete selected countries');
    clearSelection();
  }

  return (
    <LookupTable
      title="Countries and locales"
      hasSelection={hasSelection}
      onAdd={() => console.warn('TODO: add country')}
      onDelete={handleDelete}
      columns={Columns}
      state={state}
      hasData={!!options.length}
      skeletonItems={PAGE_SIZE}
      skeleton={CountryRowSkeleton}
      selectedPage={selectedPage}
      setPage={setPage}
      pageSize={PAGE_SIZE}
      totalCount={totalCount}
    >
      {options.map((item) => (
        <LookupTableRow
          key={item.id}
          item={item}
          columns={Columns}
          ariaLabel={`Select ${item.country}`}
          isSelected={isSelected(item.id)}
          onToggle={() => toggleRow(item.id)}
          onEdit={() => router.push(`/admin/lookups/countries/edit/${item.id}`)}
          onDelete={() => console.warn('TODO: delete country', item.id)}
        />
      ))}
    </LookupTable>
  );
}
