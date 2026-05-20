import type { FilterTabConfig } from '@frontend/components/filter-tabs/model/filter-tabs.model';

export interface UiFilterTabsProps<TValue> {
  tabs: FilterTabConfig<TValue>[];
  activeValue: TValue;
  onChange: (value: TValue) => void;
  withDot?: boolean;
  withCount?: boolean;
  withIcon?: boolean;
}
