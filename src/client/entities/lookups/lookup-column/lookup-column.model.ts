import { type ReactNode } from 'react';

export interface LookupColumnDef<T> {
  header: string;
  /** Рендер комірки для конкретного запису */
  cell: (item: T) => ReactNode;
  /** Додаткові класи для UiTableHead */
  headerClassName?: string;
  /** Додаткові класи для UiTableCell */
  cellClassName?: string;
}
