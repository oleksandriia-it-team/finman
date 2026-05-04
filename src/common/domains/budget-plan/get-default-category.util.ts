import { ExpenseCategories, IncomeCategories } from '@common/enums/categories.enum';
import { TypeEntry } from '@common/enums/entry.enum';

export function getDefaultCategory(type: TypeEntry.Income | TypeEntry.Expense | undefined) {
  return type === TypeEntry.Income ? IncomeCategories.Misc : ExpenseCategories.Misc;
}
