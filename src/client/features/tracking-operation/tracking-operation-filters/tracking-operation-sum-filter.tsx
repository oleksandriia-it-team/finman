import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { cn } from '@frontend/shared/utils/cn.util';
import type { FiltersDefaultProps } from '@frontend/features/tracking-operation/tracking-operation-filters/filters-default.props';
import { NumberOnlyPattern } from '@common/constants/number-only-pattern.constant';
import { Slider } from '@frontend/ui/ui-slider/slider';
import { useFormContext, useWatch } from 'react-hook-form';

//TODO ADD SLIDER BELOW INPUTS AND BIND IT'S VALUE TO INPUTS

export function SumFilter({ className }: FiltersDefaultProps) {
  const classes = cn('size-full flex flex-col gap-3', className);

  const { control, setValue } = useFormContext();

  const startValue = useWatch({ control, name: 'start' }) || 0;
  const endValue = useWatch({ control, name: 'end' }) || 50000;

  const handleSliderChange = (values: number[]) => {
    const [min, max] = values;
    setValue('start', min, { shouldValidate: true, shouldDirty: true });
    setValue('end', max, { shouldValidate: true, shouldDirty: true });
  };

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
      <Slider
        defaultValue={[startValue, endValue]}
        min={0}
        max={50000}
        step={5}
        onValueChange={handleSliderChange}
      />
    </div>
  );
}
