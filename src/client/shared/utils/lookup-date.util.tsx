import { type ReactNode } from 'react';
import { DateFormatType } from '@frontend/shared/enums/date-type.enum';
import { UiTransformDate } from '@frontend/shared/ui/ui-transform-date/ui-transform-date';

export function formatLookupDate(date: Date | string | number | undefined): ReactNode {
  if (!date) {
    return '—';
  }

  return (
    <UiTransformDate
      date={date}
      type={DateFormatType.ShortWithYear}
      className="text-sm text-primary"
    />
  );
}
