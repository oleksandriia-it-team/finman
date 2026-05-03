import { cn } from '@frontend/shared/utils/cn.util';
import { UiButton } from '../ui-button/ui-button';
import { type ComponentProps, useMemo } from 'react';
import { type DayButton } from 'react-day-picker';
import type { ColorVariantModel } from '@frontend/shared/models/color-variant.model';

export function UiDayButton({ modifiers, className, day, ...props }: ComponentProps<typeof DayButton>) {
  const dataSelectedSingle =
    modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle;
  const dataRangeStart = modifiers.range_start;
  const dataRangeEnd = modifiers.range_end;
  const dataRangeMiddle = modifiers.range_middle;

  const selected = dataSelectedSingle || dataRangeStart || dataRangeEnd;

  const variant: ColorVariantModel = useMemo(() => {
    if (selected || dataRangeMiddle) {
      return 'primary';
    }

    if (modifiers.outside) {
      return 'muted';
    }

    return 'default';
  }, [dataRangeMiddle, modifiers.outside, selected]);

  return (
    <UiButton
      variant={variant}
      bgNone={modifiers.outside && !selected && !dataRangeMiddle}
      size="sm"
      isOutlined={dataRangeMiddle}
      paddingNone
      data-day={day.date.toLocaleDateString()}
      className={cn('flex aspect-square !size-auto min-w-(--cell-size) flex-col gap-1 leading-none', className)}
      {...props}
    />
  );
}
