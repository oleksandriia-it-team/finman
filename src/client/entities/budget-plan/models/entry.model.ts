import { TypeEntry } from '../../../shared/enums/entry.enum';
import { Month } from '../../../shared/enums/month.enum';
import { DefaultTableColumns } from '../../../database/models/default-table-columns.model';

export type Entry = RegularEntry | UnregularEntry | DelayedExpense;

export interface RegularEntry extends DefaultTableColumns {
  type: TypeEntry.Credit | TypeEntry.Expense | TypeEntry.Income;
  description: string;
  sum: number;
  regular: true;
}

export interface UnregularEntry {
  type: TypeEntry;
  description: string;
  sum: number;
  regular: false;
}

export interface DelayedExpense extends DefaultTableColumns {
  type: TypeEntry.Expense;
  description: string;
  sum: number;
  delayed: true;
  delayedMonth: Month;
  delayedYear: number;
}
