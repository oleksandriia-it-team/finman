import { FinControlledDatepicker } from '@frontend/components/controlled-fields/fin-controlled-datepicker';
import { UiFieldsWithDivider } from '@frontend/ui/ui-fields-with-divider/ui-fields-with-divider';
import { useFormContext } from 'react-hook-form';

export function TrackingOperationDatepicker() {
  const { setFocus } = useFormContext();

  return (
    <UiFieldsWithDivider
      firstField={
        <FinControlledDatepicker
          label="Від"
          mode="single"
          name="dateFrom"
          placeholder="04.04.2000"
          id="startTrackingOperationDate"
          onBlur={() => {
            console.log(1);
            setFocus('dateTo', { shouldSelect: true });
          }}
        />
      }
      secondField={
        <FinControlledDatepicker
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
