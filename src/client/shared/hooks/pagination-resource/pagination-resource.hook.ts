import { useCallback, useEffect, useMemo, useState } from 'react';
import type {
  PaginationResource,
  PaginationResourceConfig,
} from '@frontend/shared/hooks/pagination-resource/models/pagination-resource.model';
import { useQuery } from '@tanstack/react-query';
import { useCombineStates } from '@frontend/shared/hooks/combine-states/combine-states.hook';
import { getFirstErrorMessage } from '@frontend/shared/utils/get-first-error-message.util';
import { getPromiseState } from '@frontend/shared/utils/get-promise-state.util';
import { checkIsAppErrorObj } from '@common/utils/check-is-api-error.util';

export function usePaginationResource<T, F extends object>({
  getTotalCountFn,
  getOptionsFn,
  queryKey,
  pageSize,
  filters,
  clearCacheOnDestroy,
  filtersJSON,
}: PaginationResourceConfig<T, F>): PaginationResource<T> {
  const [selectedPage, setPage] = useState<number>(1);
  const filtersKey = useMemo(
    () => (filtersJSON ? filtersJSON : JSON.stringify(filters ?? null)),
    [filtersJSON, filters],
  );

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

  const state = useCombineStates(getPromiseState(getOptionsQuery.status), getPromiseState(getTotalCountQuery.status));

  const errorMessage = useMemo(() => {
    return getFirstErrorMessage(getOptionsQuery.error, getTotalCountQuery.error);
  }, [getOptionsQuery.error, getTotalCountQuery.error]);

  const errorStatus = useMemo(() => {
    const error = getOptionsQuery.error ?? getTotalCountQuery.error;
    if (!error) return undefined;
    return checkIsAppErrorObj(error) ? error.status : 500;
  }, [getOptionsQuery.error, getTotalCountQuery.error]);

  const reload = useCallback(() => {
    getOptionsQuery.refetch();
    getTotalCountQuery.refetch();
  }, [getOptionsQuery, getTotalCountQuery]);

  return {
    state,
    options: getOptionsQuery.data ?? [],
    totalCount: getTotalCountQuery.data ?? 0,
    errorMessage,
    errorStatus,
    selectedPage,
    setPage,
    reload,
  };
}
