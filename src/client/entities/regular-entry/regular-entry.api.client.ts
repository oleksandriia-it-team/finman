import type { ICrudService } from '@common/models/crud-service.model';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ApiResultOperationSuccess } from '@common/models/api-result-operation.model';
import type { RegularEntry } from '@common/records/regular-entry.record';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';
import type { DeepPartial } from 'typeorm';
import type { RegularEntryFilter } from '@common/domains/regular-entry/filter/regular-entry.filter';

export class RegularEntryApiClient implements ICrudService<RegularEntry> {
  async createItem(data: Omit<RegularEntry, DefaultColumnKeys>): Promise<number> {
    return fetchClient
      .post<ApiResultOperationSuccess<number>>('/api/budget/regular-entry/create', data)
      .then((r) => r.data);
  }

  async deleteItem(id: number): Promise<true> {
    return fetchClient
      .delete<ApiResultOperationSuccess<true>>(`/api/budget/regular-entry/remove/${id}`)
      .then((r) => r.data);
  }

  async getItemById(id: number): Promise<RegularEntry | null> {
    return fetchClient
      .get<ApiResultOperationSuccess<RegularEntry | null>>(`/api/budget/regular-entry/get-by-id/${id}`)
      .then((r) => r.data);
  }

  async getItems(from: number, to: number, filters?: DeepPartial<RegularEntryFilter>): Promise<RegularEntry[]> {
    return fetchClient
      .post<ApiResultOperationSuccess<RegularEntry[]>>('/api/budget/regular-entry/get-items', {
        from,
        to,
        filters,
      })
      .then((r) => r.data);
  }

  async getTotalCount(filters?: DeepPartial<RegularEntryFilter>): Promise<number> {
    return fetchClient
      .post<ApiResultOperationSuccess<number>>('/api/budget/regular-entry/get-total-count', { filters })
      .then((r) => r.data);
  }

  async updateItem(id: number, data: Omit<RegularEntry, 'id'>): Promise<true> {
    return fetchClient
      .put<ApiResultOperationSuccess<true>>(`/api/budget/regular-entry/update/${id}`, data)
      .then((r) => r.data);
  }
}

export const regularEntryApiClient = new RegularEntryApiClient();
