'use client';

import { useState, useRef } from 'react';
import type { Currency } from '@common/records/currencies.record';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import { lookupsService } from '@frontend/entities/lookups/lookups.service';
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { LookupTable } from '@frontend/entities/lookups/lookup-table/lookup-table';
import { LookupTableRow } from '@frontend/entities/lookups/lookup-table/lookup-table-row';
import { LookupRowSkeleton } from '@frontend/entities/lookups/lookup-table/lookup-row-skeleton';
import { type LookupColumnDef } from '@frontend/entities/lookups/lookup-column/lookup-column.model';
import { useLookupSelection } from '../hooks/use-lookup-selection.hook';

import { CurrencyFormModal } from '@frontend/features/admin/lookups/currencies/currency-form-modal';
import { UiConfirmModal } from '@frontend/components/confirm-modal/fin-confirm-modal';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';

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

const skeletonWidths = ['w-32', 'w-20', 'w-12', 'w-24', 'w-24', 'w-24'];

function CurrencyRowSkeleton() {
  return <LookupRowSkeleton columnWidths={skeletonWidths} />;
}

export function CurrenciesLookup() {
  const { hasSelection, isSelected, toggleRow, clearSelection } = useLookupSelection();
  const { showToast } = useGlobalToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Currency | undefined>(undefined);

  const [itemToDelete, setItemToDelete] = useState<Currency | null>(null);

  const singleDeleteTriggerRef = useRef<HTMLButtonElement>(null);
  const bulkDeleteTriggerRef = useRef<HTMLButtonElement>(null);

  const { options, state, selectedPage, setPage, totalCount } = usePaginationResource<Currency, object>({
    queryKey: ['admin', 'lookups', 'currencies'],
    pageSize: pageSize,
    getOptionsFn: (page) =>
      lookupsService.getItems(LookupsTypeEnum.Currency, (page - 1) * pageSize + 1, page * pageSize, {}),
    getTotalCountFn: () => lookupsService.getTotalCount(LookupsTypeEnum.Currency, {}),
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

  const handleSingleDeleteClick = (item: Currency) => {
    setItemToDelete(item);
    setTimeout(() => singleDeleteTriggerRef.current?.click(), 0);
  };

  const confirmSingleDelete = async () => {
    if (!itemToDelete) return;
    try {
      await fetchClient.patch(`/api/lookups/currencies/update/${itemToDelete.id}`, {
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

  const handleBulkDeleteClick = () => {
    setTimeout(() => bulkDeleteTriggerRef.current?.click(), 0);
  };

  return (
    <>
      <LookupTable
        title="Currencies"
        hasSelection={hasSelection}
        onAdd={() => {
          setEditingItem(undefined);
          setIsFormOpen(true);
        }}
        onDelete={handleBulkDeleteClick}
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
            onEdit={() => {
              setEditingItem(item);
              setIsFormOpen(true);
            }}
            onDelete={() => handleSingleDeleteClick(item)}
          />
        ))}
      </LookupTable>

      <CurrencyFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={
          editingItem
            ? {
                id: editingItem.id,
                name: editingItem.currencyName,
                code: editingItem.currencyCode,
                symbol: editingItem.currencySymbol,
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
          description={`Ви впевнені, що хочете видалити валюту "${itemToDelete?.currencyName}"?`}
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
