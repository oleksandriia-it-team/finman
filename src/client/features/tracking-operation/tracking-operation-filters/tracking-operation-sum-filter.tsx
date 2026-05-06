'use client';

import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { cn } from '@frontend/shared/utils/cn.util';
import type { FiltersDefaultProps } from '@frontend/features/tracking-operation/tracking-operation-filters/props/filters-default.props';
import { NumberOnlyPattern } from '@common/constants/number-only-pattern.constant';
import { UiSlider } from '@frontend/ui/ui-slider/ui-slider';
import { useFormContext, useWatch } from 'react-hook-form';
import { UiFieldsWithDivider } from '@frontend/ui/ui-fields-with-divider/ui-fields-with-divider';

export function SumFilter({ className }: FiltersDefaultProps) {
  const classes = cn('size-full flex flex-col gap-3', className);

  const { control, setValue } = useFormContext();

  const minValue = useWatch({ control, name: 'minSum' }) ?? 0;
  const maxValue = useWatch({ control, name: 'maxSum' }) ?? 50000;

  const handleSliderChange = (values: number[]) => {
    const [min, max] = values;
    setValue('minSum', min, { shouldValidate: true, shouldDirty: true });
    setValue('maxSum', max, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className={classes}>
      <p className="text-lg">Сума</p>
      <UiFieldsWithDivider
        firstField={
          <FinControlledInput
            type="number"
            id="minSum"
            name="minSum"
            label="Мін"
            pattern={NumberOnlyPattern}
          />
        }
        secondField={
          <FinControlledInput
            type="number"
            id="maxSum"
            name="maxSum"
            label="Макс"
            pattern={NumberOnlyPattern}
          />
        }
      />

      <UiSlider
        value={[minValue, maxValue]}
        min={0}
        max={50000}
        step={5}
        onValueChange={handleSliderChange}
      />
    </div>
  );
}
