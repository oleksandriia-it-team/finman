import { isEmpty } from '@common/utils/is-empty.util';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import type {
  PaginationResource,
  PaginationResourceConfig,
} from '@frontend/shared/hooks/pagination-resource/models/pagination-resource.model';
import { useQuery } from '@tanstack/react-query';
import { getErrorMessage } from '@common/utils/get-error-message.util';

export function usePaginationResource<T, F extends object>({
  getTotalCountFn,
  getOptionsFn,
  queryKey,
  pageSize,
  filters,
  clearCacheOnDestroy,
}: PaginationResourceConfig<T, F>): PaginationResource<T> {
  const [selectedPage, setPage] = useState<number>(1);
  const filtersKey = useMemo(() => JSON.stringify(filters ?? null), [filters]);

  const getOptionsQuery = useQuery({
    queryKey: [...queryKey, 'options', String(selectedPage), String(pageSize), filtersKey],
    queryFn: () => getOptionsFn(selectedPage, pageSize, filters),
    placeholderData: (previousData) => previousData,
    staleTime: clearCacheOnDestroy ? 0 : 5 * 60 * 1000,
  });

  const getTotalCountQuery = useQuery({
    queryKey: [...queryKey, 'total-count', filtersKey],
    queryFn: () => getTotalCountFn(filters),
    staleTime: clearCacheOnDestroy ? 0 : 5 * 60 * 1000,
  });

  useEffect(() => {
    setPage(1);
  }, [filtersKey]);

  const state = useMemo(() => {
    const statuses = [getOptionsQuery.status, getTotalCountQuery.status];

    if (statuses.every((status) => status === 'success')) {
      return PromiseState.Success;
    }

    if (statuses.includes('error')) {
      return PromiseState.Error;
    }

    return PromiseState.Loading;
  }, [getOptionsQuery.status, getTotalCountQuery.status]);

  const errorMessage = useMemo(() => {
    const errors = [getOptionsQuery.error, getTotalCountQuery.error];

    const error = errors.find((error) => !!error);

    if (isEmpty(error)) {
      return undefined;
    }

    return getErrorMessage(error);
  }, [getOptionsQuery.error, getTotalCountQuery.error]);

  const reload = useCallback(() => getOptionsQuery.refetch(), [getOptionsQuery]);

  return {
    state,
    options: getOptionsQuery.data ?? [],
    totalCount: getTotalCountQuery.data ?? 0,
    errorMessage,
    selectedPage,
    setPage,
    reload,
  };
}
