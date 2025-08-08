import { TypeEntry } from '../enums/entry.enum';
import { DefaultTableColumns } from '../../../shared/classes/crud-service.class';
import { Month } from '../../../shared/enums/month.enum';

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