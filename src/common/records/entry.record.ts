import type { TypeEntry } from '@common/enums/entry.enum';
import type { DefaultTableColumns } from '@common/models/default-table-columns.model';
import type { ExpenseCategory, IncomeCategory } from '@common/enums/categories.enum';

export type EntryBase = DefaultTableColumns & {
  title: string;
  description: string;
  sum: number;
  type: TypeEntry.Expense | TypeEntry.Income;
  category: ExpenseCategory | IncomeCategory;
};
