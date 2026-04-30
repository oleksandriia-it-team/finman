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
import { UiConfirmModal } from '@frontend/shared/components/confirm-modal/fin-confirm-modal';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import { useCurrencyMutations } from '@frontend/features/admin/lookups/hooks/use-currency-mutations.hook';
import { UiButton } from '@frontend/ui/ui-button/ui-button';

const PAGE_SIZE = 20;

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
  const { hasSelection, isSelected, toggleRow, clearSelection, selected, deselect } = useLookupSelection();
  const { showToast } = useGlobalToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Currency | undefined>(undefined);
  const [itemToDelete, setItemToDelete] = useState<Currency | null>(null);

  const singleDeleteTriggerRef = useRef<HTMLButtonElement>(null);
  const bulkDeleteTriggerRef = useRef<HTMLButtonElement>(null);

  const { options, state, selectedPage, setPage, totalCount, reload } = usePaginationResource<Currency, object>({
    queryKey: ['admin', 'lookups', 'currencies'],
    pageSize: PAGE_SIZE,
    getOptionsFn: (page) =>
      lookupsService.getItems(LookupsTypeEnum.Currency, (page - 1) * PAGE_SIZE + 1, page * PAGE_SIZE, {}),
    getTotalCountFn: () => lookupsService.getTotalCount(LookupsTypeEnum.Currency, {}),
  });

  const { deleteMutation: bulkDeleteMutation } = useCurrencyMutations();
  const { deleteMutation: singleDeleteMutation } = useCurrencyMutations();

  const handleBulkDeleteClick = () => {
    if (hasSelection) {
      bulkDeleteTriggerRef.current?.click();
    }
  };

  const confirmBulkDelete = async () => {
    const results = await Promise.allSettled(Array.from(selected).map((id) => bulkDeleteMutation.mutateAsync(id)));
    const hasFailed = results.some((r) => r.status === 'rejected');
    if (hasFailed) {
      showToast({ title: 'Помилка', description: 'Деякі записи не вдалось видалити', variant: 'destructive' });
    } else {
      showToast({ title: 'Успішно', description: 'Вибрані записи видалено', variant: 'default' });
    }
    clearSelection();
    reload();
  };

  const handleSingleDeleteClick = (item: Currency) => {
    setItemToDelete(item);
    singleDeleteTriggerRef.current?.click();
  };

  const confirmSingleDelete = async () => {
    if (!itemToDelete) return;
    await singleDeleteMutation.mutateAsync(itemToDelete.id);
    deselect(itemToDelete.id);
    showToast({ title: 'Успішно', description: 'Запис видалено', variant: 'default' });
    setItemToDelete(null);
    reload();
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
        skeletonItems={PAGE_SIZE}
        skeleton={CurrencyRowSkeleton}
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
        onSuccessCallback={() => reload()}
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
            <UiButton
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
            <UiButton
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
