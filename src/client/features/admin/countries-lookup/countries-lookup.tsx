'use client';

import { useState, useRef } from 'react';
import type { CountryAndLocale } from '@common/records/countries.record';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import { lookupsService } from '@frontend/entities/lookups/lookups.service';
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { LookupTable } from '@frontend/entities/lookups/lookup-table/lookup-table';
import { LookupTableRow } from '@frontend/entities/lookups/lookup-table/lookup-table-row';
import { LookupRowSkeleton } from '@frontend/entities/lookups/lookup-table/lookup-row-skeleton';
import { type LookupColumnDef } from '@frontend/entities/lookups/lookup-column/lookup-column.model';
import { useLookupSelection } from '../hooks/use-lookup-selection.hook';
import { CountryFormModal } from '@frontend/features/admin/lookups/countries/country-form-modal';
import { UiConfirmModal } from '@frontend/components/confirm-modal/fin-confirm-modal';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';

const PAGE_SIZE = 20;

const Columns: LookupColumnDef<CountryAndLocale>[] = [
  {
    header: 'Країна',
    cellClassName: 'py-2 text-sm font-medium text-foreground',
    cell: (item) => item.country,
  },
  {
    header: 'Локаль',
    cellClassName: 'py-2 text-sm text-muted-foreground',
    cell: (item) => item.locale,
  },
];

const skeletonWidths = ['w-32', 'w-24', 'w-24', 'w-24', 'w-24'];

function CountryRowSkeleton() {
  return <LookupRowSkeleton columnWidths={skeletonWidths} />;
}

export function CountriesLookup() {
  const { hasSelection, isSelected, toggleRow, clearSelection } = useLookupSelection();
  const { showToast } = useGlobalToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CountryAndLocale | undefined>(undefined);

  const [itemToDelete, setItemToDelete] = useState<CountryAndLocale | null>(null);

  const singleDeleteTriggerRef = useRef<HTMLButtonElement>(null);
  const bulkDeleteTriggerRef = useRef<HTMLButtonElement>(null);

  const { options, state, selectedPage, setPage, totalCount } = usePaginationResource<CountryAndLocale, object>({
    queryKey: ['admin', 'lookups', 'countries'],
    pageSize: PAGE_SIZE,
    getOptionsFn: (page) =>
      lookupsService.getItems(LookupsTypeEnum.CountriesAndLocales, (page - 1) * PAGE_SIZE + 1, page * PAGE_SIZE, {}),
    getTotalCountFn: () => lookupsService.getTotalCount(LookupsTypeEnum.CountriesAndLocales, {}),
  });

  const confirmBulkDelete = async () => {
    try {
      showToast({ title: 'Success', description: 'Вибрані записи успішно видалено', variant: 'default' });
      clearSelection();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Помилка видалення';
      showToast({ title: 'Error', description: msg, variant: 'destructive' });
    }
  };

  const handleSingleDeleteClick = (item: CountryAndLocale) => {
    setItemToDelete(item);
    setTimeout(() => singleDeleteTriggerRef.current?.click(), 0);
  };

  const confirmSingleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await fetchClient.patch(`/api/lookups/countries/update/${itemToDelete.id}`, {
        softDeleted: 1,
      });
      showToast({ title: 'Success', description: 'Запис успішно видалено', variant: 'default' });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Помилка видалення';
      showToast({ title: 'Error', description: msg, variant: 'destructive' });
    } finally {
      setItemToDelete(null);
    }
  };

  return (
    <>
      <LookupTable
        title="Countries and locales"
        hasSelection={hasSelection}
        onAdd={() => {
          setEditingItem(undefined);
          setIsFormOpen(true);
        }}
        onDelete={confirmBulkDelete}
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
            onEdit={() => {
              setEditingItem(item);
              setIsFormOpen(true);
            }}
            onDelete={() => handleSingleDeleteClick(item)}
          />
        ))}
      </LookupTable>

      <CountryFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={
          editingItem
            ? {
                id: editingItem.id,
                countryName: editingItem.country,
                localeName: editingItem.locale,
              }
            : undefined
        }
      />

      <div className="hidden">
        <UiConfirmModal
          trigger={
            <button
              ref={singleDeleteTriggerRef}
              type="button"
              aria-hidden="true"
            />
          }
          onConfirm={confirmSingleDelete}
          title="Підтвердження видалення"
          description={`Ви впевнені, що хочете видалити країну "${itemToDelete?.country}"?`}
        />

        <UiConfirmModal
          trigger={
            <button
              ref={bulkDeleteTriggerRef}
              type="button"
              aria-hidden="true"
            />
          }
          onConfirm={confirmBulkDelete}
          title="Підтвердження масового видалення"
          description="Ви впевнені, що хочете видалити всі вибрані записи?"
        />
      </div>
    </>
  );
}
