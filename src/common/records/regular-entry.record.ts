import { type DefaultTableColumns } from '../models/default-table-columns.model';
import { type TypeEntry } from '../enums/entry.enum';

export interface RegularEntry extends DefaultTableColumns {
  type: TypeEntry.Expense | TypeEntry.Income; // TODO: add TypeEntry.Credit later
  title: string;
  description: string;
  sum: number;
  regular: true;
}

export type RegularApiEntry = Omit<RegularEntry, 'regular'>;
