import { type DefaultTableColumns } from '../models/default-table-columns.model';
import { type TypeEntry } from '../enums/entry.enum';
import { type Month } from '../enums/month.enum';

export interface DelayedExpense extends DefaultTableColumns {
  type: TypeEntry.Expense;
  description: string;
  sum: number;
  delayed: true;
  delayedMonth: Month;
  delayedYear: number;
}
