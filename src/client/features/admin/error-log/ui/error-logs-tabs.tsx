import type { FilterTabConfig } from '@frontend/components/filter-tabs/model/filter-tabs.model';
import { ErrorLogStatus } from '@common/constants/error-log-status.constant';
import { UiFilterTabs } from '@frontend/components/filter-tabs/ui-filter-tabs';
import type { ErrorLogFilter } from '@common/domains/lookups/filters/error-log.filter';

interface ErrorLogTabsProps {
  filters: Partial<ErrorLogFilter>;
  setFilters: (filters: Partial<ErrorLogFilter>) => void;
  statusesCount: Record<ErrorLogStatus | 'total', number>;
}

export function ErrorLogTabs({ filters, setFilters, statusesCount }: ErrorLogTabsProps) {
  const errorLogTabs: FilterTabConfig<ErrorLogStatus | undefined>[] = [
    { value: undefined, label: 'Усі', count: statusesCount['total'] || 0 },
    {
      value: ErrorLogStatus.Active,
      label: 'Активні',
      dotColor: 'bg-destructive-foreground',
      count: statusesCount[ErrorLogStatus.Active] || 0,
    },
    {
      value: ErrorLogStatus.IsResolving,
      label: 'В обробці',
      dotColor: 'bg-warning',
      count: statusesCount[ErrorLogStatus.IsResolving] || 0,
    },
    {
      value: ErrorLogStatus.Resolved,
      label: 'Вирішені',
      dotColor: 'bg-success',
      count: statusesCount[ErrorLogStatus.Resolved] || 0,
    },
    {
      value: ErrorLogStatus.Ignored,
      label: 'Ігноровані',
      dotColor: 'bg-muted-foreground',
      count: statusesCount[ErrorLogStatus.Ignored] || 0,
    },
  ];

  return (
    <UiFilterTabs
      tabs={errorLogTabs}
      activeValue={filters.status}
      onChange={(newValue) => {
        if (newValue === undefined) {
          const restFilters = { ...filters };
          delete restFilters.status;
          setFilters(restFilters);
        } else {
          setFilters({ ...filters, status: newValue });
        }
      }}
      withDot={true}
      withCount={true}
    />
  );
}
