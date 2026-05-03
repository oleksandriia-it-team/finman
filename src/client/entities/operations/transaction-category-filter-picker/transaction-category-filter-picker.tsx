import type { AllCategories } from '@common/enums/categories.enum';
import { CategoriesMapping } from '@frontend/shared/styles/card-styles-mappings';
import { UiFilterPill } from '@frontend/ui/ui-filter-pill/ui-filter-pill';
import { useState } from 'react';

export interface TransactionCategoryFilterPickerProps {
  category: AllCategories;
}

export function TransactionCategoryFilterPicker({ category }: TransactionCategoryFilterPickerProps) {
  const { variant, icon, label } = CategoriesMapping[category];

  const [isActive, setIsActive] = useState(false);

  return (
    <UiFilterPill
      variant={variant}
      size="xs"
      icon={icon}
      isActive={isActive}
      setActive={setIsActive}
    >
      {label}
    </UiFilterPill>
  );
}
