import {
  CategoriesMapping,
  ExpenseCategoryKeys,
  IncomeCategoryKeys,
} from '@frontend/entities/budget-plan/income-expense-card/card-styles-mappings';
import type { TransactionType } from '@frontend/entities/budget-plan/transaction-card/props/transaction-card-props';
import { useFormContext } from 'react-hook-form';
import { TypeEntry } from '@common/enums/entry.enum';
import { IconPickerField } from '@frontend/ui/ui-icons-picker/fin-icons-picker-field';
import type { UiIconItem } from '@frontend/ui/ui-icons-picker/ui-icons-picker';

function toPickerItems(keys: string[]): UiIconItem[] {
  return keys.map((key) => ({
    value: key,
    ...CategoriesMapping[key as keyof typeof CategoriesMapping],
  }));
}

interface TransactionCategoryPickerProps {
  name: string;
  type: TransactionType;
}

export function TransactionCategoryPicker({ name, type }: TransactionCategoryPickerProps) {
  const { setValue } = useFormContext();
  const keys = type === TypeEntry.Income ? IncomeCategoryKeys : ExpenseCategoryKeys;

  return (
    <IconPickerField
      name={name}
      items={toPickerItems(keys)}
      onSelect={(_, label) => setValue('title', label, { shouldValidate: true, shouldDirty: true })}
    />
  );
}
