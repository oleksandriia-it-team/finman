'use client';

import type { AllCategories } from '@common/enums/categories.enum';
import { useCategoriesMapping } from '@frontend/shared/styles/card-styles-mappings';
import { UiFilterPill } from '@frontend/ui/ui-filter-pill/ui-filter-pill';
import { useFormContext, useWatch } from 'react-hook-form';
import type { TrackingOperationFilterFormData } from '@common/domains/tracking-operation/schema/tracking-operation.schema';

export interface TransactionCategoryFilterPickerProps {
  category: AllCategories;
}

export function TransactionCategoryFilterPicker({ category }: TransactionCategoryFilterPickerProps) {
  const categoriesMapping = useCategoriesMapping();
  const { variant, icon, label } = categoriesMapping[category];

  const { setValue, control } = useFormContext<TrackingOperationFilterFormData>();

  const selected: AllCategories[] = useWatch({ control, name: 'category' }) ?? [];
  const isActive = selected.includes(category);

  const toggle = () => {
    const next = isActive ? selected.filter((c) => c !== category) : [...selected, category];
    setValue('category', next.length ? next : undefined, { shouldDirty: true });
  };

  return (
    <UiFilterPill
      variant={variant}
      size="xs"
      icon={icon}
      isActive={isActive}
      setActive={toggle}
    >
      {label}
    </UiFilterPill>
  );
}
