import { DefaultTableColumns } from '../models/default-table-columns.model';
import { TypeEntry } from '../enums/entry.enum';
import { Month } from '../enums/month.enum';

export interface DelayedExpense extends DefaultTableColumns {
  type: TypeEntry.Expense;
  description: string;
  sum: number;
  delayed: true;
  delayedMonth: Month;
  delayedYear: number;
}
