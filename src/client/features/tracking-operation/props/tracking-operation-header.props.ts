import type { TrackingOperationFilter } from '@common/domains/tracking-operation/filter/tracking-operation.filter';

export interface TrackingOperationHeaderProps {
  onFiltersApply: (filters: TrackingOperationFilter) => void;
}
