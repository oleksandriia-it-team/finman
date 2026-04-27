import type { TypeEntry } from '@common/enums/entry.enum';
import type { DefaultTableColumns } from '@common/models/default-table-columns.model';
import type { ExpenseCategory, IncomeCategory } from '@common/enums/categories.enum';

export type ExpenseEntryBase = {
  type: TypeEntry.Expense;
  category: ExpenseCategory;
};

export type IncomeEntryBase = {
  type: TypeEntry.Income;
  category: IncomeCategory;
};

export type EntryBase = DefaultTableColumns & {
  title: string;
  description: string;
  sum: number;
} & (ExpenseEntryBase | IncomeEntryBase);
