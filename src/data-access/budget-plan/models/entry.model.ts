import { TypeEntry } from '../enums/entry.enum';
import { Month } from '../../../shared/enums/month.enum';
import { DefaultTableColumns } from '../../../shared/models/default-table-columns.model';

export type Entry = RegularEntry | UnregularEntry | DelayedExpense;

export interface RegularEntry extends DefaultTableColumns {
  type: TypeEntry.Credit | TypeEntry.Expense | TypeEntry.Income;
  sum: number;
  regular: true;
}

export interface UnregularEntry {
  type: TypeEntry;
  sum: number;
  regular: false;
}

export interface DelayedExpense extends DefaultTableColumns {
  type: TypeEntry.Expense;
  sum: number;
  delayed: false;
  delayedMonth: Month;
}