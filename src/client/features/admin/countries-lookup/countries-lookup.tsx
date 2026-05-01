'use client';

import { useRef, useState } from 'react';
import type { CountryAndLocale } from '@common/records/countries.record';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import { lookupsService } from '@frontend/entities/lookups/lookups.service';
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { LookupTable } from '@frontend/entities/lookups/lookup-table/lookup-table';
import { LookupTableRow } from '@frontend/entities/lookups/lookup-table/lookup-table-row';
import { type LookupColumnDef } from '@frontend/entities/lookups/lookup-column/lookup-column.model';
import { useLookupSelection } from '../hooks/use-lookup-selection.hook';
import { CountryFormModal } from '@frontend/features/admin/lookups/countries/country-form-modal';
import { UiConfirmModal } from '@frontend/shared/components/confirm-modal/fin-confirm-modal';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import { useCountryMutations } from '@frontend/features/admin/lookups/hooks/use-country-mutations.hook';
import { UiButton } from '@frontend/ui/ui-button/ui-button';

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

export function CountriesLookup() {
  const { hasSelection, isSelected, toggleRow, clearSelection, selected, deselect } = useLookupSelection();
  const { showToast } = useGlobalToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CountryAndLocale | undefined>(undefined);
  const [itemToDelete, setItemToDelete] = useState<CountryAndLocale | null>(null);

  const singleDeleteTriggerRef = useRef<HTMLButtonElement>(null);
  const bulkDeleteTriggerRef = useRef<HTMLButtonElement>(null);

  const { options, state, selectedPage, errorMessage, setPage, totalCount, reload } = usePaginationResource<
    CountryAndLocale,
    object
  >({
    queryKey: ['admin', 'lookups', 'countries'],
    pageSize: PAGE_SIZE,
    getOptionsFn: (page) =>
      lookupsService.getItems(LookupsTypeEnum.CountriesAndLocales, (page - 1) * PAGE_SIZE + 1, page * PAGE_SIZE, {}),
    getTotalCountFn: () => lookupsService.getTotalCount(LookupsTypeEnum.CountriesAndLocales, {}),
  });

  console.log(state);

  const { deleteMutation: bulkDeleteMutation } = useCountryMutations();

  const { deleteMutation: singleDeleteMutation } = useCountryMutations();

  const handleBulkDeleteClick = () => {
    if (hasSelection) {
      bulkDeleteTriggerRef.current?.click();
    }
  };

  const confirmBulkDelete = async () => {
    await Promise.all(Array.from(selected).map((id) => bulkDeleteMutation.mutateAsync(id)));
    showToast({ title: 'Успішно', description: 'Вибрані записи видалено', variant: 'default' });
    clearSelection();
    reload();
  };

  const handleSingleDeleteClick = (item: CountryAndLocale) => {
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
        title="Countries and locales"
        hasSelection={hasSelection}
        onAdd={() => {
          setEditingItem(undefined);
          setIsFormOpen(true);
        }}
        onDelete={handleBulkDeleteClick}
        errorMessage={errorMessage}
        columns={Columns}
        state={state}
        hasData={!!options.length}
        skeletonItems={PAGE_SIZE}
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
        onSuccessCallback={() => reload()}
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
            <UiButton
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
