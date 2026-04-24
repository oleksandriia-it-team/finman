import { useController, useFormContext } from 'react-hook-form';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import type { TransactionType } from '@frontend/entities/budget-plan/transaction-card/props/transaction-card-props';
import {
  CategoriesMapping,
  ExpenseCategoryKeys,
  IncomeCategoryKeys,
} from '@frontend/entities/budget-plan/income-expense-card/card-styles-mappings';

interface CategoryPickerProps {
  name: string;
  type: TransactionType;
}

export function CategoryPicker({ name, type }: CategoryPickerProps) {
  const { control } = useFormContext();
  const { field } = useController({ name, control });

  const categories = type === 'income' ? IncomeCategoryKeys : ExpenseCategoryKeys;

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => {
        const style = CategoriesMapping[cat];
        const isSelected = field.value === cat;

        return (
          <button
            key={cat}
            type="button"
            title={style.label}
            onClick={() => field.onChange(cat)}
            className={cn(
              'p-3 rounded-2xl transition-all border-2',
              isSelected
                ? cn(style.bgColor, style.textColor, 'border-primary scale-110 shadow-md')
                : 'bg-secondary text-muted-foreground border-transparent hover:bg-accent',
            )}
          >
            <UiSvgIcon
              name={style.icon}
              size="sm"
            />
          </button>
        );
      })}
    </div>
  );
}
