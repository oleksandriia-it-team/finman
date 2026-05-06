import { TypeEntryFilter } from '@common/enums/entry.enum';

export const TypeEntryLabelsRecord: Record<TypeEntryFilter, string> = {
  [TypeEntryFilter.All]: 'Всі',
  [TypeEntryFilter.Expense]: 'Витрати',
  [TypeEntryFilter.Income]: 'Доходи',
};
