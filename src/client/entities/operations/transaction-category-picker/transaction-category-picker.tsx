import {
  CategoriesMapping,
  ExpenseCategoryValues,
  IncomeCategoryValues,
} from '@frontend/entities/operations/income-expense-card/card-styles-mappings';
import { useFormContext } from 'react-hook-form';
import { TypeEntry } from '@common/enums/entry.enum';
import { IconPickerField } from '@frontend/ui/ui-icons-picker/fin-icons-picker-field';
import type { UiIconItem } from '@frontend/ui/ui-icons-picker/ui-icons-picker';
import type { AllCategories } from '@common/enums/categories.enum';

function toPickerItems(categories: AllCategories[]): UiIconItem[] {
  return categories.map((category) => ({
    value: category,
    ...CategoriesMapping[category],
  }));
}

interface TransactionCategoryPickerProps {
  name: string;
  type: TypeEntry;
}

export function TransactionCategoryPicker({ name, type }: TransactionCategoryPickerProps) {
  const { setValue } = useFormContext();
  const keys = type === TypeEntry.Income ? IncomeCategoryValues : ExpenseCategoryValues;

  return (
    <IconPickerField
      name={name}
      items={toPickerItems(keys)}
      onSelect={(_, label) => setValue('title', label, { shouldValidate: true, shouldDirty: true })}
    />
  );
}
