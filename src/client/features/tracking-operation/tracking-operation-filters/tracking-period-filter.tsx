import { RegularPaymentFrequencyFilter } from '@common/enums/regular-freequency.enum';
import { UiFilterPill } from '@frontend/ui/ui-filter-pill/ui-filter-pill';
import { useState } from 'react';
import { cn } from '@frontend/shared/utils/cn.util';
import type { FiltersDefaultProps } from '@frontend/features/tracking-operation/tracking-operation-filters/filters-default.props';

export function PeriodFilters({ className }: FiltersDefaultProps) {
  const classes = cn('size-full flex flex-row gap-1 flex-wrap', className);

  const [isActive, setIsActive] = useState('');
  return (
    <div className={classes}>
      {Object.values(RegularPaymentFrequencyFilter).map((item, i) => {
        return (
          <UiFilterPill
            key={i}
            isActive={isActive === item}
            setActive={() => setIsActive((prev) => (prev === item ? '' : item))}
            variant="primary"
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
