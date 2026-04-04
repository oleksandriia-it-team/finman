import { DropdownResource, DropdownResourceConfig } from './models/dropdown-resource.model';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { isEmpty } from '@common/utils/is-empty.util';
import { PromiseState } from '../../enums/promise-state.enum';
import { getErrorMessage } from '@common/utils/get-error-message.util';

export function useDropdownResource<T, Multiple extends boolean = false>({
  multiple,
  currentValue,
  getTotalCountQuery,
  getOptionsQuery,
  getLabelFn,
  labelQueryKey,
}: DropdownResourceConfig<T, Multiple>): DropdownResource<T, Multiple> {
  const isMultiple = multiple === true;

  const currentValueArr = useMemo(() => {
    if (isEmpty(currentValue)) return [];
    if (isMultiple) {
      return (Array.isArray(currentValue) ? currentValue : [currentValue]) as T[];
    }
    return [currentValue as T];
  }, [currentValue, isMultiple]);

  const foundOptions = useMemo(() => {
    if (!getOptionsQuery.data) return [];
    return getOptionsQuery.data.filter((i) => currentValueArr.includes(i.value));
  }, [getOptionsQuery.data, currentValueArr]);

  const shouldFetchLabel = !isEmpty(currentValue) && foundOptions.length !== currentValueArr.length && !getOptionsQuery.isLoading;

  const getLabelQuery = useQuery<(Multiple extends true ? string[] : string) | undefined | null>({
    queryKey: [...labelQueryKey, currentValueArr],
    queryFn: () => {
      if (isEmpty(currentValue) || getOptionsQuery.isLoading) {
        return Promise.resolve((isMultiple ? [] : '') as unknown as (Multiple extends true ? string[] : string));
      }

      if (foundOptions.length === currentValueArr.length) {
        const labels = currentValueArr.map(val => foundOptions.find(o => o.value === val)?.label ?? '');
        return Promise.resolve((isMultiple ? labels : labels[0]) as unknown as (Multiple extends true ? string[] : string));
      }

      return getLabelFn(currentValue!);
    },
    enabled: shouldFetchLabel,
  });

  const inputLabel = useMemo(() => {
    if (!isEmpty(getLabelQuery.data)) {
      return getLabelQuery.data as (Multiple extends true ? string[] : string);
    }

    if (foundOptions.length > 0) {
      const labels = currentValueArr.map(val => foundOptions.find(o => o.value === val)?.label ?? '');
      return (isMultiple ? labels : (labels[0] ?? '')) as unknown as (Multiple extends true ? string[] : string);
    }

    return (isMultiple ? [] : '') as unknown as (Multiple extends true ? string[] : string);
  }, [getLabelQuery.data, foundOptions, currentValueArr, isMultiple]);

  const state = useMemo(() => {
    const statuses = [
      getOptionsQuery.status,
      !getLabelQuery.isEnabled ? 'success' : getLabelQuery.status,
      getTotalCountQuery?.status ?? 'success',
    ];

    if (statuses.every((status) => status === 'success')) {
      return PromiseState.Success;
    }

    if (statuses.includes('error')) {
      return PromiseState.Error;
    }

    return PromiseState.Loading;
  }, [getOptionsQuery.status, getLabelQuery.status, getTotalCountQuery?.status, getLabelQuery.isEnabled]);

  const errorMessage = useMemo(() => {
    const errors = [getOptionsQuery.error, getLabelQuery.error, getTotalCountQuery?.error];

    const error = errors.find((error) => !!error);

    if (isEmpty(error)) {
      return undefined;
    }

    return getErrorMessage(error);
  }, [getOptionsQuery.error, getLabelQuery.error, getTotalCountQuery?.error]);

  return {
    state,
    options: getOptionsQuery.data ?? [],
    totalCount: getTotalCountQuery?.data ?? 0,
    inputLabel,
    errorMessage,
  };
}
