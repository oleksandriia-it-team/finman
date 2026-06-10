import { UiTableHead } from '@frontend/shared/ui/ui-table/ui-table-head';
import { type LookupColumnDef } from '@frontend/entities/lookups/lookup-column/lookup-column.model';
import { useTranslations } from 'next-intl';

interface LookupTableHeadProps<T> {
  columns: LookupColumnDef<T>[];
}

export function LookupTableHead<T>({ columns }: LookupTableHeadProps<T>) {
  const t = useTranslations('admin.lookup');
  const head = 'h-9 py-1 text-xs font-medium uppercase   text-muted-foreground';
  return (
    <>
      <UiTableHead className="w-10 pl-4" />

      {columns.map((col) => (
        <UiTableHead
          key={col.header}
          className={col.headerClassName ?? head}
        >
          {col.header}
        </UiTableHead>
      ))}

      <UiTableHead className={head}>{t('statusHead')}</UiTableHead>
      <UiTableHead className={head}>{t('createdHead')}</UiTableHead>
      <UiTableHead className={head}>{t('createdByHead')}</UiTableHead>
      <UiTableHead className={head}>{t('updatedHead')}</UiTableHead>
      <UiTableHead className="w-10" />
    </>
  );
}
