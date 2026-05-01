import { TransactionCategoryFilterPicker } from '@frontend/entities/operations/transaction-category-filter-picker/transaction-category-filter-picker';
import { AllCategoryValues } from '@common/enums/categories.enum';
import { cn } from '@frontend/shared/utils/cn.util';
import type { FiltersDefaultProps } from '@frontend/features/tracking-operation/tracking-operation-filters/filters-default.props';

export function CategoryFilters({ className }: FiltersDefaultProps) {
  const classes = cn('size-full flex flex-wrap flex-col justify-center items-start gap-2', className);

  return (
    <div className={classes}>
      <p className="text-lg">Категорія</p>
      <div className="flex flex-row  gap-1 flex-wrap items-start justify-start">
        {AllCategoryValues.map((category, i) => {
          return (
            <TransactionCategoryFilterPicker
              key={i}
              category={category}
            />
          );
        })}
      </div>
    </div>
  );
}
