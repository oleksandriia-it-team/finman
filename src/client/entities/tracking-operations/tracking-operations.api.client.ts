import type { TrackingOperationRecord } from '@common/records/tracking-operation.record';
import type { TrackingOperationStatisticDto } from '@common/domains/tracking-operation/schema/tracking-operation.schema';
import type { TrackingOperationFilter } from '@common/domains/tracking-operation/filter/tracking-operation.filter';
import type { DeepPartial } from '@common/models/deep-partial.model';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ApiResultOperationSuccess } from '@common/models/api-result-operation.model';
import type {
  GetTrackingOperationStatisticResponse,
  ITrackingOperationRepository,
} from '@common/domains/tracking-operation/models/tracking-operation.repository.model';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';

export class TrackingOperationsApiClient implements ITrackingOperationRepository {
  async getItems(
    from: number,
    to: number,
    filters?: DeepPartial<TrackingOperationFilter>,
  ): Promise<TrackingOperationRecord[]> {
    return fetchClient
      .post<
        ApiResultOperationSuccess<TrackingOperationRecord[]>
      >('/api/tracking-operation/get-items', { from, to, filters })
      .then((r) => r.data);
  }

  async getItemById(id: number): Promise<TrackingOperationRecord | null> {
    return fetchClient
      .get<ApiResultOperationSuccess<TrackingOperationRecord>>(`/api/tracking-operation/get-by-id/${id}`)
      .then((r) => r.data);
  }

  async getTotalCount(filters?: DeepPartial<TrackingOperationFilter>): Promise<number> {
    return fetchClient
      .post<ApiResultOperationSuccess<number>>('/api/tracking-operation/get-total-items', { filters })
      .then((r) => r.data);
  }

  async createItem(data: Omit<TrackingOperationRecord, DefaultColumnKeys>): Promise<number> {
    return fetchClient
      .post<ApiResultOperationSuccess<number>>('/api/tracking-operation/create', data)
      .then((r) => r.data);
  }

  async updateItem(id: number, data: Omit<TrackingOperationRecord, DefaultColumnKeys>): Promise<true> {
    return fetchClient
      .put<ApiResultOperationSuccess<true>>(`/api/tracking-operation/update/${id}`, data)
      .then((r) => r.data);
  }

  async deleteItem(id: number): Promise<true> {
    return fetchClient
      .delete<ApiResultOperationSuccess<true>>(`/api/tracking-operation/remove/${id}`)
      .then((r) => r.data);
  }

  async getStatistic(input: TrackingOperationStatisticDto): Promise<GetTrackingOperationStatisticResponse> {
    return fetchClient
      .post<
        ApiResultOperationSuccess<GetTrackingOperationStatisticResponse>
      >('/api/tracking-operation/get-statistic', input)
      .then((r) => r.data);
  }

  async getMaxSum(): Promise<number> {
    return fetchClient
      .get<ApiResultOperationSuccess<number>>('/api/tracking-operation/get-max-sum')
      .then((r) => r.data);
  }
}

export const trackingOperationsApiClient = new TrackingOperationsApiClient();
