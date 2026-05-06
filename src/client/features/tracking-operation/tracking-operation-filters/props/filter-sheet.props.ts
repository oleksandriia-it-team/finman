import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';
import type { TrackingOperationFilter } from '@common/domains/tracking-operation/filter/tracking-operation.filter';

export interface FiltersSheetProps extends ChildrenComponentProps {
  onApply?: (filters: TrackingOperationFilter) => Promise<void> | void;
}
