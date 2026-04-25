import { type TrackingOperationFilter } from '@common/domains/tracking-operation/filter/tracking-operation.filter';

export interface TrackingOperationApiFilter extends TrackingOperationFilter {
  userId: number;
}
