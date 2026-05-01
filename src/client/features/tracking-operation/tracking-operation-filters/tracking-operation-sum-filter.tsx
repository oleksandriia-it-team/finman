import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { cn } from '@frontend/shared/utils/cn.util';
import type { FiltersDefaultProps } from '@frontend/features/tracking-operation/tracking-operation-filters/filters-default.props';
import { NumberOnlyPattern } from '@common/constants/number-only-pattern.constant';

//TODO ADD SLIDER BELOW INPUTS AND BIND IT'S VALUE TO INPUTS

export function SumFilter({ className }: FiltersDefaultProps) {
  const classes = cn('size-full flex flex-col', className);

  return (
    <div className={classes}>
      <p className="text-lg">Сума</p>
      <div className="flex flex-row items-center justify-center gap-10 text-muted">
        <FinControlledInput
          type="number"
          id="start"
          name="start"
          label="Мін"
          pattern={NumberOnlyPattern}
        />
        <span className="pt-4 absolute text-black">—</span>
        <FinControlledInput
          type="number"
          id="end"
          name="end"
          label="Макс"
          pattern={NumberOnlyPattern}
        />
      </div>
    </div>
  );
}
