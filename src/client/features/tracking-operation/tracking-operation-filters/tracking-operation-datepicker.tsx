import { FinControlledDatepicker } from '@frontend/components/controlled-fields/fin-controlled-datepicker';
import { UiFieldsWithDivider } from '@frontend/ui/ui-fields-with-divider/ui-fields-with-divider';
import { useFormContext } from 'react-hook-form';
import { getMinMaxDates } from '@common/utils/get-min-max-dates.util';

export function TrackingOperationDatepicker() {
  const { setFocus, watch } = useFormContext();

  const dateFrom = watch('dateFrom');
  const dateTo = watch('dateTo');

  const { minDate: toMinDate, maxDate: fromMaxDate } = getMinMaxDates(dateFrom, dateTo);
  console.log(toMinDate, fromMaxDate);

  return (
    <UiFieldsWithDivider
      firstField={
        <FinControlledDatepicker
          maxDate={fromMaxDate}
          label="Від"
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
            date.setHours(23, 59, 59, 999);
            return date;
          }}
          minDate={toMinDate}
          label="До"
          mode="single"
          name="dateTo"
          placeholder="04.04.2000"
          id="endTrackingOperationDate"
        />
      }
    />
  );
}
