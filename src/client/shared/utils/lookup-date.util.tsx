import { type ReactNode } from 'react';
import { DateFormatType } from '@frontend/shared/enums/date-type.enum';
import { FinTransformDate } from '@frontend/components/transform-date/fin-transform-date';

export function formatLookupDate(date: Date | string | number | undefined): ReactNode {
  if (!date) {
    return '—';
  }

  return (
    <FinTransformDate
      date={date}
      type={DateFormatType.ShortWithYear}
      className="text-sm text-primary"
    />
  );
}
