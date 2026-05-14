import { errorLogsApiClient } from '@frontend/entities/error-log/error-log.api.client';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { useState } from 'react';
import type { ErrorLogFilter } from '@common/domains/lookups/filters/error-log.filter';
import type { ErrorLogRecord } from '@common/records/error-log.record';
import type { ErrorLogStatus } from '@common/constants/error-log-status.constant';
import { useQuery } from '@tanstack/react-query';

export function useErrorLogs(initialFilters: Partial<ErrorLogFilter> = {}) {
  const [filters, setFilters] = useState<Partial<ErrorLogFilter>>(initialFilters);

  const [selectedLog, setSelectedLog] = useState<ErrorLogRecord | null>(null);

  const pagination = usePaginationResource<ErrorLogRecord, Partial<ErrorLogFilter>>({
    queryKey: ['admin', 'error-logs'],
    getOptionsFn: (page, size, currentFilters) =>
      errorLogsApiClient.getItems(page, size, currentFilters as ErrorLogFilter),
    getTotalCountFn: (currentFilters) => errorLogsApiClient.getTotalCount(currentFilters as ErrorLogFilter),
    pageSize: 20,
    filters: filters,
  });

  const updateStatusMutation = useSendDataFetch(
    async ({ id, status }: { id: string | number; status: ErrorLogStatus }) => {
      return await errorLogsApiClient.updateStatus(id, status);
    },
    {
      successMessage: 'Статус помилки успішно оновлено',
      onSuccess: (result) => {
        if (result.status === 200) {
          pagination.reload();
          setSelectedLog(null);
        }
      },
    },
  );

  const { data: statusesCount = {} } = useQuery({
    queryKey: ['admin', 'error-logs', 'statuses-count'],
    queryFn: () => errorLogsApiClient.getStatusesCount(),
  });

  return {
    ...pagination,
    filters,
    setFilters,
    selectedLog,
    setSelectedLog,
    updateStatus: updateStatusMutation.mutate,
    isUpdating: updateStatusMutation.isPending,
    statusesCount,
  };
}
