'use client';

import { useQuery } from '@tanstack/react-query';
import { lookupsService } from '@frontend/entities/lookups/lookups.service';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import type { CountryAndLocale } from '@common/records/countries.record';
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
import { useLookupSelection } from '../hooks/use-lookup-selection.hook';

function formatDate(date: Date | undefined) {
  if (!date) return '—';
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function CountriesLookup() {
  const { hasSelection, isSelected, toggleRow, clearSelection } = useLookupSelection();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['admin', 'lookups', 'countries'],
    queryFn: () => lookupsService.getItems(LookupsTypeEnum.CountriesAndLocales, 1, 300, {}),
  });

  function handleAdd() {
    // TODO: implement add country
    console.warn('TODO: add country');
  }

  function handleDelete() {
    // TODO: implement bulk delete
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

      <div className="flex-1 overflow-auto bg-white">
        {isLoading && (
          <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
            <UiSpinner className="size-5" />
            <span className="text-sm">Завантаження...</span>
          </div>
        )}

        {isError && !isLoading && (
          <div className="flex items-center justify-center py-16">
            <span className="text-sm text-red-500">Помилка завантаження даних</span>
          </div>
        )}

        {!isLoading && !isError && (
          <UiTable>
            <UiTableHeader>
              <UiTableRow className="border-b border-gray-100 hover:bg-transparent">
                <UiTableHead className="w-10 pl-4" />
                <UiTableHead className="text-xs font-medium text-gray-400 uppercase w-16">ID</UiTableHead>
                <UiTableHead className="text-xs font-medium text-gray-400 uppercase">Country</UiTableHead>
                <UiTableHead className="text-xs font-medium text-gray-400 uppercase">Locale</UiTableHead>
                <UiTableHead className="text-xs font-medium text-gray-400 uppercase">Status</UiTableHead>
                <UiTableHead className="text-xs font-medium text-gray-400 uppercase">Created at</UiTableHead>
                <UiTableHead className="text-xs font-medium text-gray-400 uppercase">Updated at</UiTableHead>
                <UiTableHead className="w-10" />
              </UiTableRow>
            </UiTableHeader>

            <UiTableBody>
              {data.map((item: CountryAndLocale) => (
                <UiTableRow
                  key={item.id}
                  className={cn('border-b border-gray-100', isSelected(item.id) && 'bg-blue-50')}
                >
                  <UiTableCell className="pl-4 w-10">
                    <input
                      type="checkbox"
                      aria-label={`Select ${item.country}`}
                      checked={isSelected(item.id)}
                      onChange={() => toggleRow(item.id)}
                      className="w-4 h-4 rounded border-gray-300 accent-blue-500 cursor-pointer"
                    />
                  </UiTableCell>
                  <UiTableCell className="text-sm text-gray-500 w-16">{item.id}</UiTableCell>
                  <UiTableCell className="text-sm font-medium text-gray-900">{item.country}</UiTableCell>
                  <UiTableCell className="text-sm text-gray-600">{item.locale}</UiTableCell>
                  <UiTableCell>
                    <LookupStatusBadge softDeleted={item.softDeleted} />
                  </UiTableCell>
                  <UiTableCell className="text-sm text-blue-500">{formatDate(item.createdAt)}</UiTableCell>
                  <UiTableCell className="text-sm text-blue-500">{formatDate(item.updatedAt)}</UiTableCell>
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
    </div>
  );
}
