import { isEmpty } from '@common/utils/is-empty.util';
import { useEffect, useMemo, useState } from 'react';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { getErrorMessage } from '@common/utils/get-error-message.util';
import type {
  PaginationResource,
  PaginationResourceConfig,
} from '@frontend/shared/hooks/pagination-resource/models/pagination-resource.model';
import { useQuery } from '@tanstack/react-query';

export function usePaginationResource<T, F extends object>({
  getTotalCountFn,
  getOptionsFn,
  queryKey,
  pageSize,
  filters,
}: PaginationResourceConfig<T, F>): PaginationResource<T> {
  const [selectedPage, setPage] = useState<number>(1);
  const filtersKey = useMemo(() => JSON.stringify(filters ?? null), [filters]);

  const getOptionsQuery = useQuery({
    queryKey: [...queryKey, 'options', String(selectedPage), String(pageSize), filtersKey],
    queryFn: () => getOptionsFn(selectedPage, pageSize, filters),
    placeholderData: (previousData) => previousData,
  });

  const getTotalCountQuery = useQuery({
    queryKey: [...queryKey, 'total-count', filtersKey],
    queryFn: () => getTotalCountFn(filters),
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

  return {
    state,
    options: getOptionsQuery.data ?? [],
    totalCount: getTotalCountQuery.data ?? 0,
    errorMessage,
    selectedPage,
    setPage,
  };
}
