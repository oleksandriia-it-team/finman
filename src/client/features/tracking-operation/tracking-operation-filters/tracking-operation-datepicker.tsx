import { FinControlledDatepicker } from '@frontend/components/controlled-fields/fin-controlled-datepicker';
import { UiFieldsWithDivider } from '@frontend/ui/ui-fields-with-divider/ui-fields-with-divider';
import { useFormContext } from 'react-hook-form';
import { getMinMaxDates } from '@common/utils/get-min-max-dates.util';
import { useMemo } from 'react';
import { isSameDay } from 'date-fns';
import { useTranslations } from 'next-intl';

export function TrackingOperationDatepicker() {
  const t = useTranslations('tracking.filters');
  const { setFocus, watch } = useFormContext();

  const dateFrom = watch('dateFrom');
  const dateTo = watch('dateTo');

  const now = useMemo(() => new Date(), []);

  const { minDate: toMinDate, maxDate: fromMaxDate } = getMinMaxDates(dateFrom, dateTo, undefined, now);

  return (
    <UiFieldsWithDivider
      firstField={
        <FinControlledDatepicker
          maxDate={fromMaxDate}
          label={t('dateFrom')}
          mode="single"
          name="dateFrom"
          placeholder="04.04.2000"
          id="startTrackingOperationDate"
          onBlur={() => {
            requestAnimationFrame(() => {
              setFocus('dateTo');
            });
          }}
        />
      }
      secondField={
        <FinControlledDatepicker
          transformForSingle={(date) => {
            if (isSameDay(now, date)) {
              return now;
            }
            const newDate = new Date(date);

            newDate.setHours(23, 59, 59, 999);
            return newDate;
          }}
          minDate={toMinDate}
          maxDate={now}
          label={t('dateTo')}
          mode="single"
          name="dateTo"
          placeholder="04.04.2000"
          id="endTrackingOperationDate"
        />
      }
    />
  );
}
