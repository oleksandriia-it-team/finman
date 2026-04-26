import { type ReactNode } from 'react';
import { UiSpinner } from '@frontend/ui/ui-spinner/spinner';
import { UiTable } from '@frontend/shared/ui/ui-table/ui-table';
import { UiTableHeader } from '@frontend/shared/ui/ui-table/ui-table-header';
import { UiTableBody } from '@frontend/shared/ui/ui-table/ui-table-body';
import { UiTableRow } from '@frontend/shared/ui/ui-table/ui-table-row';
import { UiTableHead } from '@frontend/shared/ui/ui-table/ui-table-head';
import { UiTableCell } from '@frontend/shared/ui/ui-table/ui-table-cell';

export interface LookupColumn<T> {
  key: keyof T;
  label: string;
}

interface LookupTableProps<T> {
  title: string;
  columns: LookupColumn<T>[];
  items: T[];
  isLoading: boolean;
  isError: boolean;
  renderCell?: (item: T, key: keyof T) => ReactNode;
}

export function LookupTable<T extends { id: number }>({
  title,
  columns,
  items,
  isLoading,
  isError,
  renderCell,
}: LookupTableProps<T>) {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>

      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        {isLoading && (
          <div className="flex items-center justify-center py-16 gap-3 text-muted-foreground">
            <UiSpinner className="size-5" />
            <span className="text-sm">Завантаження...</span>
          </div>
        )}

        {isError && !isLoading && (
          <div className="flex items-center justify-center py-16">
            <span className="text-sm text-destructive">Помилка завантаження даних</span>
          </div>
        )}

        {!isLoading && !isError && (
          <UiTable>
            <UiTableHeader>
              <UiTableRow>
                {columns.map((col) => (
                  <UiTableHead key={String(col.key)}>{col.label}</UiTableHead>
                ))}
              </UiTableRow>
            </UiTableHeader>
            <UiTableBody>
              {items.length === 0 ? (
                <UiTableRow>
                  <UiTableCell
                    colSpan={columns.length}
                    className="py-12 text-center text-muted-foreground"
                  >
                    Дані відсутні
                  </UiTableCell>
                </UiTableRow>
              ) : (
                items.map((item) => (
                  <UiTableRow key={item.id}>
                    {columns.map((col) => (
                      <UiTableCell key={String(col.key)}>
                        {renderCell ? renderCell(item, col.key) : String(item[col.key] ?? '')}
                      </UiTableCell>
                    ))}
                  </UiTableRow>
                ))
              )}
            </UiTableBody>
          </UiTable>
        )}
      </div>

      {!isLoading && !isError && (
        <p className="text-xs text-muted-foreground">
          Всього записів: <span className="font-medium">{items.length}</span>
        </p>
      )}
    </div>
  );
}
