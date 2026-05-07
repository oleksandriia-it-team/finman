import type { TrackingOperationRecord } from '@common/records/tracking-operation.record';
import type { TrackingOperationFilter } from '@common/domains/tracking-operation/filter/tracking-operation.filter';
import type { DeepPartial } from '@common/models/deep-partial.model';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ApiResultOperationSuccess } from '@common/models/api-result-operation.model';
import type {
  GetBasicInformationResponse,
  ITrackingOperationRepository,
} from '@common/domains/tracking-operation/models/tracking-operation.repository.model';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';
import { parseISO } from 'date-fns';

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
      .then((r) => {
        return r.data.map((data) => {
          data.date = parseISO(data.date as unknown as string);

          return data;
        });
      });
  }

  async getItemById(id: number): Promise<TrackingOperationRecord | null> {
    return fetchClient
      .get<ApiResultOperationSuccess<TrackingOperationRecord>>(`/api/tracking-operation/get-by-id/${id}`)
      .then((r) => {
        const data = r.data;
        data.date = parseISO(data.date as unknown as string);

        return data;
      });
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

  async getBasicInformation(filters?: DeepPartial<TrackingOperationFilter>): Promise<GetBasicInformationResponse> {
    return fetchClient
      .post<
        ApiResultOperationSuccess<GetBasicInformationResponse>
      >('/api/tracking-operation/get-basic-information', filters ?? {})
      .then((r) => r.data);
  }
}

export const trackingOperationsApiClient = new TrackingOperationsApiClient();
