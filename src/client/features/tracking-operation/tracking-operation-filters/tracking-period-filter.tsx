import { RegularPaymentFrequencyFilter } from '@common/enums/regular-freequency.enum';
import { UiFilterPill } from '@frontend/ui/ui-filter-pill/ui-filter-pill';
import { cn } from '@frontend/shared/utils/cn.util';
import type { FiltersDefaultProps } from '@frontend/features/tracking-operation/tracking-operation-filters/filters-default.props';
import { useFormContext, useWatch } from 'react-hook-form';
import type { TrackingOperationFilterFormData } from '@common/domains/tracking-operation/schema/tracking-operation.schema';
import { getDateRangeForPeriod } from '@common/utils/get-date-range-for-period';
import { isSameDay } from 'date-fns';

export function PeriodFilters({ className }: FiltersDefaultProps) {
  const { setValue, control } = useFormContext<TrackingOperationFilterFormData>();

  const dateFrom = useWatch({ control, name: 'dateFrom' });
  const dateTo = useWatch({ control, name: 'dateTo' });

  const activePeriod =
    Object.values(RegularPaymentFrequencyFilter).find((period) => {
      if (!dateFrom || !dateTo) return false;
      const range = getDateRangeForPeriod(period);
      return isSameDay(range.dateFrom, new Date(dateFrom)) && isSameDay(range.dateTo, new Date(dateTo));
    }) ?? null;

  const handleToggle = (item: RegularPaymentFrequencyFilter) => {
    if (activePeriod === item) {
      setValue('dateFrom', undefined, { shouldDirty: true });
      setValue('dateTo', undefined, { shouldDirty: true });
    } else {
      const { dateFrom, dateTo } = getDateRangeForPeriod(item);
      setValue('dateFrom', dateFrom, { shouldDirty: true });
      setValue('dateTo', dateTo, { shouldDirty: true });
    }
  };

  const classes = cn('size-full flex flex-row gap-1 flex-wrap', className);

  return (
    <div className={classes}>
      {Object.values(RegularPaymentFrequencyFilter).map((item, i) => {
        return (
          <UiFilterPill
            key={i}
            isActive={activePeriod === item}
            setActive={() => handleToggle(item)}
            variant="primary"
            size="sm"
            isOutlined={false}
            borderNone
          >
            {item}
          </UiFilterPill>
        );
      })}
    </div>
  );
}
