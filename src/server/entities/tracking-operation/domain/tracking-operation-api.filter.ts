import { type TrackingOperationFilter } from '@common/domains/lookups/filters/tracking-operation.filter';

export interface TrackingOperationApiFilter extends TrackingOperationFilter {
  userId: number;
}
