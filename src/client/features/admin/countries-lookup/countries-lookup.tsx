'use client';

import type { CountryAndLocale } from '@common/records/countries.record';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import { lookupsService } from '@frontend/entities/lookups/lookups.service';
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { FinPagination } from '@frontend/components/pagination/fin-pagination';
import { UiTable } from '@frontend/shared/ui/ui-table/ui-table';
import { UiTableHeader } from '@frontend/shared/ui/ui-table/ui-table-header';
import { UiTableBody } from '@frontend/shared/ui/ui-table/ui-table-body';
import { UiTableRow } from '@frontend/shared/ui/ui-table/ui-table-row';
import { UiTableHead } from '@frontend/shared/ui/ui-table/ui-table-head';
import { UiTableCell } from '@frontend/shared/ui/ui-table/ui-table-cell';
import { UiSpinner } from '@frontend/ui/ui-spinner/spinner';
import { cn } from '@frontend/shared/utils/cn.util';
import { LookupStatusBadge } from '@frontend/entities/lookups/lookup-status-badge/lookup-status-badge';
import { LookupPageHeader } from '@frontend/entities/lookups/lookup-page-header/lookup-page-header';
import { LookupRowActions } from '@frontend/entities/lookups/lookup-row-actions/lookup-row-actions';
import { formatLookupDate } from '@frontend/shared/utils/lookup-date.util';
import { useLookupSelection } from '../hooks/use-lookup-selection.hook';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';

const PAGE_SIZE = 20;

export function CountriesLookup() {
  const { hasSelection, isSelected, toggleRow, clearSelection } = useLookupSelection();

  const { options, state, selectedPage, setPage, totalCount } = usePaginationResource<CountryAndLocale, object>({
    queryKey: ['admin', 'lookups', 'countries'],
    pageSize: PAGE_SIZE,
    getOptionsFn: (page) =>
      lookupsService.getItems(LookupsTypeEnum.CountriesAndLocales, (page - 1) * PAGE_SIZE + 1, page * PAGE_SIZE, {}),
    getTotalCountFn: () => lookupsService.getTotalCount(LookupsTypeEnum.CountriesAndLocales, {}),
  });

  function handleAdd() {
    console.warn('TODO: add country');
  }

  function handleDelete() {
    console.warn('TODO: delete selected countries');
    clearSelection();
  }

  return (
    <div className="flex flex-col h-full">
      <LookupPageHeader
        title="Countries and locales"
        hasSelection={hasSelection}
        onAdd={handleAdd}
        onDelete={handleDelete}
      />

      <div className="flex-1 overflow-auto bg-background">
        {state === PromiseState.Loading && (
          <div className="flex items-center justify-center gap-3 py-16 text-muted-foreground">
            <UiSpinner className="size-5" />
            <span className="text-sm">Завантаження...</span>
          </div>
        )}

        {state === PromiseState.Error && (
          <div className="flex items-center justify-center py-16">
            <span className="text-sm text-destructive">Помилка завантаження даних</span>
          </div>
        )}

        {state === PromiseState.Success && (
          <UiTable>
            <UiTableHeader>
              <UiTableRow className="border-b border-border hover:bg-transparent">
                <UiTableHead className="w-10 pl-4" />
                <UiTableHead className="w-16 text-xs font-medium uppercase text-muted-foreground">ID</UiTableHead>
                <UiTableHead className="text-xs font-medium uppercase text-muted-foreground">Country</UiTableHead>
                <UiTableHead className="text-xs font-medium uppercase text-muted-foreground">Locale</UiTableHead>
                <UiTableHead className="text-xs font-medium uppercase text-muted-foreground">Status</UiTableHead>
                <UiTableHead className="text-xs font-medium uppercase text-muted-foreground">Created at</UiTableHead>
                <UiTableHead className="text-xs font-medium uppercase text-muted-foreground">Updated at</UiTableHead>
                <UiTableHead className="w-10" />
              </UiTableRow>
            </UiTableHeader>

            <UiTableBody>
              {options.map((item: CountryAndLocale) => (
                <UiTableRow
                  key={item.id}
                  className={cn('border-b border-border', isSelected(item.id) && 'bg-primary/10')}
                >
                  <UiTableCell className="pl-4 w-10">
                    <input
                      type="checkbox"
                      aria-label={`Select ${item.country}`}
                      checked={isSelected(item.id)}
                      onChange={() => toggleRow(item.id)}
                      className="w-4 h-4 cursor-pointer rounded border-border accent-primary"
                    />
                  </UiTableCell>
                  <UiTableCell className="w-16 text-sm text-muted-foreground">{item.id}</UiTableCell>
                  <UiTableCell className="text-sm font-medium text-foreground">{item.country}</UiTableCell>
                  <UiTableCell className="text-sm text-muted-foreground">{item.locale}</UiTableCell>
                  <UiTableCell>
                    <LookupStatusBadge softDeleted={item.softDeleted} />
                  </UiTableCell>
                  <UiTableCell className="text-sm text-primary">{formatLookupDate(item.createdAt)}</UiTableCell>
                  <UiTableCell className="text-sm text-primary">{formatLookupDate(item.updatedAt)}</UiTableCell>
                  <UiTableCell className="w-10">
                    <LookupRowActions
                      onEdit={() => console.warn('TODO: edit country', item.id)}
                      onDelete={() => console.warn('TODO: delete country', item.id)}
                    />
                  </UiTableCell>
                </UiTableRow>
              ))}
            </UiTableBody>
          </UiTable>
        )}
      </div>

      <div className="border-t border-border bg-background px-6 py-3">
        <FinPagination
          selectedPage={selectedPage}
          setPage={setPage}
          pageSize={PAGE_SIZE}
          totalCount={totalCount}
        />
      </div>
    </div>
  );
}
