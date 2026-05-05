import type { TrackingOperationFilter } from '@common/domains/tracking-operation/filter/tracking-operation.filter';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';
import type { TrackingOperationStatisticDto } from '@common/domains/tracking-operation/schema/tracking-operation.schema';
import type { ICrudService } from '@common/models/crud-service.model';
import type { TrackingOperationRecord } from '@common/records/tracking-operation.record';

export interface GetTrackingOperationStatisticResponse {
  totalIncomes: number;
  totalOutcomes: number;
}

export interface ITrackingOperationRepository extends ICrudService<
  TrackingOperationRecord,
  Omit<TrackingOperationRecord, DefaultColumnKeys>,
  TrackingOperationFilter
> {
  getStatistic(input: TrackingOperationStatisticDto & { userId?: number }): Promise<GetTrackingOperationStatisticResponse>;
  getMaxSum(userId?: number): Promise<number>;
}
