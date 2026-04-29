import { type ReactNode } from 'react';

export interface LookupColumnDef<T> {
  header: string;
  cell: (item: T) => ReactNode;
  headerClassName?: string;
  cellClassName?: string;
}
