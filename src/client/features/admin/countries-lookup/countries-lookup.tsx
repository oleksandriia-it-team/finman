'use client';

import type { CountryAndLocale } from '@common/records/countries.record';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import { LookupTable } from '@frontend/entities/lookups/lookup-table/lookup-table';
import { LookupTableRow } from '@frontend/entities/lookups/lookup-table/lookup-table-row';
import { type LookupColumnDef } from '@frontend/entities/lookups/lookup-column/lookup-column.model';
import { CountryFormModal } from '@frontend/features/admin/lookups/countries/country-form-modal';
import { UiConfirmModal } from '@frontend/shared/components/confirm-modal/fin-confirm-modal';
import { useCountryMutations } from '@frontend/features/admin/lookups/hooks/use-country-mutations.hook';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { useAdminLookup } from '../hooks/use-admin-lookup.hook';

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
  const lookup = useAdminLookup<CountryAndLocale>({
    lookupType: LookupsTypeEnum.CountriesAndLocales,
    queryKey: ['admin', 'lookups', 'countries'],
    useMutations: useCountryMutations,
    getDeleteName: (item) => item.country,
    singleDeleteDescription: (name) => `Ви впевнені, що хочете видалити країну "${name}"?`,
  });

  return (
    <>
      <LookupTable
        title="Countries and locales"
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
            ariaLabel={`Select ${item.country}`}
            isSelected={lookup.selection.isSelected(item.id)}
            onToggle={() => lookup.selection.toggleRow(item.id)}
            onEdit={() => lookup.openEditForm(item)}
            onDelete={() => lookup.requestSingleDelete(item)}
          />
        ))}
      </LookupTable>

      <CountryFormModal
        isOpen={lookup.isFormOpen}
        onClose={() => lookup.setIsFormOpen(false)}
        onSuccessCallback={() => lookup.reload()}
        initialData={
          lookup.editingItem
            ? {
                id: lookup.editingItem.id,
                countryName: lookup.editingItem.country,
                localeName: lookup.editingItem.locale,
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
