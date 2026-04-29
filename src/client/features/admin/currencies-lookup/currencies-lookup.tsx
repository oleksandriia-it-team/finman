'use client';

import type { Currency } from '@common/records/currencies.record';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import { lookupsService } from '@frontend/entities/lookups/lookups.service';
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { LookupTable } from '@frontend/entities/lookups/lookup-table/lookup-table';
import { LookupTableRow } from '@frontend/entities/lookups/lookup-table/lookup-table-row';
import { LookupRowSkeleton } from '@frontend/entities/lookups/lookup-table/lookup-row-skeleton';
import { type LookupColumnDef } from '@frontend/entities/lookups/lookup-column/lookup-column.model';
import { useLookupSelection } from '../hooks/use-lookup-selection.hook';
import { useRouter } from 'next/navigation';

const pageSize = 20;

const Columns: LookupColumnDef<Currency>[] = [
  {
    header: "Ім'я",
    cellClassName: 'py-2 text-sm font-medium text-foreground',
    cell: (item) => item.currencyName,
  },
  {
    header: 'Код',
    cellClassName: 'py-2 text-sm text-muted-foreground',
    cell: (item) => item.currencyCode,
  },
  {
    header: 'Символ',
    cellClassName: 'py-2 text-sm text-muted-foreground',
    cell: (item) => item.currencySymbol,
  },
];

const skeletonWidths = ['w-32', 'w-20', 'w-12'];

function CurrencyRowSkeleton() {
  return <LookupRowSkeleton columnWidths={skeletonWidths} />;
}

export function CurrenciesLookup() {
  const router = useRouter();
  const { hasSelection, isSelected, toggleRow, clearSelection } = useLookupSelection();

  const { options, state, selectedPage, setPage, totalCount } = usePaginationResource<Currency, object>({
    queryKey: ['admin', 'lookups', 'currencies'],
    pageSize: pageSize,
    getOptionsFn: (page) =>
      lookupsService.getItems(LookupsTypeEnum.Currency, (page - 1) * pageSize + 1, page * pageSize, {}),
    getTotalCountFn: () => lookupsService.getTotalCount(LookupsTypeEnum.Currency, {}),
  });

  function handleDelete() {
    console.warn('TODO: delete selected currencies');
    clearSelection();
  }

  return (
    <LookupTable
      title="Currencies"
      hasSelection={hasSelection}
      onAdd={() => console.warn('TODO: add currency')}
      onDelete={handleDelete}
      columns={Columns}
      state={state}
      hasData={!!options.length}
      skeletonItems={pageSize}
      skeleton={CurrencyRowSkeleton}
      selectedPage={selectedPage}
      setPage={setPage}
      pageSize={pageSize}
      totalCount={totalCount}
    >
      {options.map((item) => (
        <LookupTableRow
          key={item.id}
          item={item}
          columns={Columns}
          ariaLabel={`Select ${item.currencyName}`}
          isSelected={isSelected(item.id)}
          onToggle={() => toggleRow(item.id)}
          onEdit={() => router.push(`/admin/lookups/currencies/edit/${item.id}`)}
          onDelete={() => console.warn('TODO: delete currency', item.id)}
        />
      ))}
    </LookupTable>
  );
}
