'use client';

import {
  useCategoriesMapping,
  ExpenseCategoryValues,
  IncomeCategoryValues,
} from '@frontend/shared/styles/card-styles-mappings';
import { useFormContext } from 'react-hook-form';
import { TypeEntry } from '@common/enums/entry.enum';
import { IconPickerField } from '@frontend/ui/ui-icons-picker/fin-icons-picker-field';
import type { UiIconItem } from '@frontend/ui/ui-icons-picker/ui-icons-picker';
import type { AllCategories } from '@common/enums/categories.enum';

interface TransactionCategoryPickerProps {
  name: string;
  type: TypeEntry;
}

export function TransactionCategoryPicker({ name, type }: TransactionCategoryPickerProps) {
  const { setValue } = useFormContext();
  const categoriesMapping = useCategoriesMapping();
  const keys = type === TypeEntry.Income ? IncomeCategoryValues : ExpenseCategoryValues;

  function toPickerItems(categories: AllCategories[]): UiIconItem[] {
    return categories.map((category) => ({
      value: category,
      ...categoriesMapping[category],
    }));
  }

  return (
    <IconPickerField
      name={name}
      items={toPickerItems(keys)}
      onSelect={(_, label) => setValue('title', label, { shouldValidate: true, shouldDirty: true })}
    />
  );
}
