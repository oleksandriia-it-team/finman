import { type DropdownResource, type DropdownResourceConfig } from './models/dropdown-resource.model';
import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { isEmpty } from '@common/utils/is-empty.util';
import { PromiseState } from '../../enums/promise-state.enum';
import { type DropdownOption } from '@frontend/shared/models/dropdown-option.model';
import { getErrorMessage } from '@common/utils/get-error-message.util';

export function useOptionsResource<T, Multiple extends boolean = false>({
  multiple,
  currentValue,
  getTotalCountQuery,
  getOptionsQuery,
  getLabelFn,
  labelQueryKey,
  onGetLabel,
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

  const shouldFetchLabel =
    !isEmpty(currentValue) && foundOptions.length !== currentValueArr.length && !getOptionsQuery.isLoading;

  const getLabelQuery = useQuery<(Multiple extends true ? DropdownOption<T>[] : DropdownOption<T>) | undefined | null>({
    queryKey: [...labelQueryKey, currentValueArr],
    queryFn: () => {
      if (isEmpty(currentValue) || getOptionsQuery.isLoading) {
        return Promise.resolve(
          (isMultiple ? [] : undefined) as unknown as
            | (Multiple extends true ? DropdownOption<T>[] : DropdownOption<T>)
            | undefined
            | null,
        );
      }

      if (foundOptions.length === currentValueArr.length) {
        const labels = currentValueArr.map((val) => foundOptions.find((o) => o.value === val)).filter((v) => !!v);
        return Promise.resolve(
          (isMultiple ? labels : labels[0]) as unknown as Multiple extends true
            ? DropdownOption<T>[]
            : DropdownOption<T>,
        );
      }

      return getLabelFn(currentValue!);
    },
    enabled: shouldFetchLabel,
  });

  useEffect(() => {
    if (getLabelQuery.data && getLabelQuery.status === 'success') {
      onGetLabel?.(getLabelQuery.data as Multiple extends true ? DropdownOption<T>[] : DropdownOption<T>);
    }
  }, [getLabelQuery.data, getLabelQuery.status, onGetLabel]);

  const inputLabel = useMemo(() => {
    if (!isEmpty(getLabelQuery.data)) {
      return getLabelQuery.data as Multiple extends true ? DropdownOption<T>[] : DropdownOption<T>;
    }

    if (foundOptions.length > 0) {
      const labels = currentValueArr.map((val) => foundOptions.find((o) => o.value === val)).filter((v) => !!v);
      return (isMultiple ? labels : (labels[0] ?? undefined)) as unknown as Multiple extends true
        ? DropdownOption<T>[]
        : DropdownOption<T>;
    }

    return (isMultiple ? [] : undefined) as unknown as Multiple extends true ? DropdownOption<T>[] : DropdownOption<T>;
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
    totalCount: getTotalCountQuery?.data ?? getOptionsQuery.data?.length ?? 0,
    inputLabel,
    errorMessage,
  };
}
