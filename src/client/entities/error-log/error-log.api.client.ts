import { calculateFromAndTo } from '@common/utils/calculate-from-and-to.util';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ErrorLogFilter } from '@common/domains/lookups/filters/error-log.filter';
import type { ErrorLogStatus } from '@common/constants/error-log-status.constant';
import type { ErrorLogRecord } from '@common/records/error-log.record';
import type { ApiResultOperation } from '@common/models/api-result-operation.model';

export const errorLogsApiClient = {
  getItems: async (page: number, size: number, filters: ErrorLogFilter): Promise<ErrorLogRecord[]> => {
    const { from, to } = calculateFromAndTo(page, size);
    const response = await fetchClient.post<
      ApiResultOperation<ErrorLogRecord[]>,
      { from: number; to: number; filters: ErrorLogFilter }
    >('/api/error-log/get-items', {
      from,
      to,
      filters,
    });

    if (response.status === 200 && response.data) {
      return response.data;
    }
    return [];
  },

  getTotalCount: async (filters: ErrorLogFilter): Promise<number> => {
    const response = await fetchClient.post<ApiResultOperation<number>, { filters: ErrorLogFilter }>(
      '/api/error-log/get-total-items',
      {
        filters,
      },
    );

    if (response.status === 200 && response.data !== undefined) {
      return response.data;
    }
    return 0;
  },

  getStatusesCount: async (filters: ErrorLogFilter): Promise<Record<ErrorLogStatus | 'total', number>> => {
    const response = await fetchClient.post<
      ApiResultOperation<Record<ErrorLogStatus | 'total', number>>,
      { filters: ErrorLogFilter }
    >('/api/error-log/get-statuses-count', { filters });
    if (response.status === 200 && response.data) {
      return response.data;
    }
    return { total: 0 } as Record<ErrorLogStatus | 'total', number>;
  },

  updateStatus: async (id: number | string, status: ErrorLogStatus) => {
    return await fetchClient.put<ApiResultOperation<boolean>, { status: ErrorLogStatus }>(
      `/api/error-log/update/${id}`,
      { status },
    );
  },
};
