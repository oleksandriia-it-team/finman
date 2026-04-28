import { UiTableHead } from '@frontend/shared/ui/ui-table/ui-table-head';
import { type LookupColumnDef } from '@frontend/entities/lookups/lookup-column/lookup-column.model';

interface LookupTableHeadProps<T> {
  columns: LookupColumnDef<T>[];
}

const HEAD_CLASS = 'h-9 py-1 text-[11px] font-medium uppercase text-muted-foreground';

export function LookupTableHead<T>({ columns }: LookupTableHeadProps<T>) {
  return (
    <>
      <UiTableHead className="w-10 pl-4" />
      <UiTableHead className={`w-16 ${HEAD_CLASS}`}>ID</UiTableHead>

      {columns.map((col, index) => (
        <UiTableHead
          key={index}
          className={col.headerClassName ?? HEAD_CLASS}
        >
          {col.header}
        </UiTableHead>
      ))}

      <UiTableHead className={HEAD_CLASS}>Status</UiTableHead>
      <UiTableHead className={HEAD_CLASS}>Created at</UiTableHead>
      <UiTableHead className={HEAD_CLASS}>Created by</UiTableHead>
      <UiTableHead className={HEAD_CLASS}>Updated at</UiTableHead>
      <UiTableHead className="w-10" />
    </>
  );
}
