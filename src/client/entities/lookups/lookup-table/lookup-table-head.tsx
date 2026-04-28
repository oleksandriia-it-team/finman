import { UiTableHead } from '@frontend/shared/ui/ui-table/ui-table-head';
import { type LookupColumnDef } from '@frontend/entities/lookups/lookup-column/lookup-column.model';

interface LookupTableHeadProps<T> {
  columns: LookupColumnDef<T>[];
}

export function LookupTableHead<T>({ columns }: LookupTableHeadProps<T>) {
  const head = 'h-9 py-1 text-[11px] font-medium uppercase text-muted-foreground';
  return (
    <>
      <UiTableHead className="w-10 pl-4" />

      {columns.map((col, index) => (
        <UiTableHead
          key={index}
          className={col.headerClassName ?? head}
        >
          {col.header}
        </UiTableHead>
      ))}

      <UiTableHead className={head}>Статус</UiTableHead>
      <UiTableHead className={head}>Створено</UiTableHead>
      <UiTableHead className={head}>Створив</UiTableHead>
      <UiTableHead className={head}>Оновлено</UiTableHead>
      <UiTableHead className="w-10" />
    </>
  );
}
