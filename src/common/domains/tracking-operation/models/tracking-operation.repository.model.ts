import type { TrackingOperationFilter } from '@common/domains/tracking-operation/filter/tracking-operation.filter';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';
import type { ICrudService } from '@common/models/crud-service.model';
import type { TrackingOperationRecord } from '@common/records/tracking-operation.record';
import type { DeepPartial } from '@common/models/deep-partial.model';

export interface GetTrackingOperationStatisticResponse {
  totalIncomes: number;
  totalOutcomes: number;
}

export interface GetBasicInformationResponse extends GetTrackingOperationStatisticResponse {
  totalCount: number;
  maxSum: number;
}

export interface ITrackingOperationRepository extends Omit<
  ICrudService<TrackingOperationRecord, Omit<TrackingOperationRecord, DefaultColumnKeys>, TrackingOperationFilter>,
  'getTotalCount'
> {
  getBasicInformation(
    filters?: DeepPartial<TrackingOperationFilter> & { userId?: number },
  ): Promise<GetBasicInformationResponse>;
}
