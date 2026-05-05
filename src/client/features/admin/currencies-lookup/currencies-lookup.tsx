'use client';

import type { Currency } from '@common/records/currencies.record';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import { LookupTable } from '@frontend/entities/lookups/lookup-table/lookup-table';
import { LookupTableRow } from '@frontend/entities/lookups/lookup-table/lookup-table-row';
import { type LookupColumnDef } from '@frontend/entities/lookups/lookup-column/lookup-column.model';
import { CurrencyFormModal } from '@frontend/features/admin/lookups/currencies/currency-form-modal';
import { UiConfirmModal } from '@frontend/shared/components/confirm-modal/fin-confirm-modal';
import { useCurrencyMutations } from '@frontend/features/admin/lookups/hooks/use-currency-mutations.hook';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { useAdminLookup } from '../hooks/use-admin-lookup.hook';

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

export function CurrenciesLookup() {
  const lookup = useAdminLookup<Currency>({
    lookupType: LookupsTypeEnum.Currency,
    queryKey: ['admin', 'lookups', 'currencies'],
    useMutations: useCurrencyMutations,
    getDeleteName: (item) => item.currencyName,
    singleDeleteDescription: (name) => `Ви впевнені, що хочете видалити валюту "${name}"?`,
  });

  return (
    <>
      <LookupTable
        title="Currencies"
        hasSelection={lookup.selection.hasSelection}
        onAdd={lookup.openCreateForm}
        onDelete={lookup.requestBulkDelete}
        errorMessage={lookup.errorMessage}
        columns={Columns}
        state={lookup.state}
        hasData={!!lookup.options.length}
        skeletonItems={lookup.pageSize}
        selectedPage={lookup.selectedPage}
        setPage={lookup.setPage}
        pageSize={lookup.pageSize}
        totalCount={lookup.totalCount}
      >
        {lookup.options.map((item) => (
          <LookupTableRow
            key={item.id}
            item={item}
            columns={Columns}
            ariaLabel={`Select ${item.currencyName}`}
            isSelected={lookup.selection.isSelected(item.id)}
            onToggle={() => lookup.selection.toggleRow(item.id)}
            onEdit={() => lookup.openEditForm(item)}
            onDelete={() => lookup.requestSingleDelete(item)}
          />
        ))}
      </LookupTable>

      <CurrencyFormModal
        isOpen={lookup.isFormOpen}
        onClose={() => lookup.setIsFormOpen(false)}
        onSuccessCallback={() => lookup.reload()}
        initialData={
          lookup.editingItem
            ? {
                id: lookup.editingItem.id,
                name: lookup.editingItem.currencyName,
                code: lookup.editingItem.currencyCode,
                symbol: lookup.editingItem.currencySymbol,
              }
            : undefined
        }
      />

      <div className="hidden">
        <UiConfirmModal
          trigger={
            <UiButton
              ref={lookup.singleDeleteTriggerRef}
              type="button"
              aria-hidden="true"
            />
          }
          onConfirm={lookup.confirmSingleDelete}
          title="Підтвердження видалення"
          description={lookup.singleDeleteDescription}
        />

        <UiConfirmModal
          trigger={
            <UiButton
              ref={lookup.bulkDeleteTriggerRef}
              type="button"
              aria-hidden="true"
            />
          }
          onConfirm={lookup.confirmBulkDelete}
          title="Підтвердження масового видалення"
          description="Ви впевнені, що хочете видалити всі вибрані записи?"
        />
      </div>
    </>
  );
}
