import { DropdownResource, DropdownResourceConfig } from './models/dropdown-resource.model';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { isEmpty } from '../../../../common/utils/is-empty.util';
import { PromiseState } from '../../enums/promise-state.enum';
import { getErrorMessage } from '../../../../common/utils/get-error-message.util';
import { usePreviousValue } from '../previous-value/previous-value.hook';

export function useDropdownResource<T>({
  currentValue,
  getTotalCountQuery,
  getOptionsQuery,
  getLabelFn,
  labelQueryKey,
}: DropdownResourceConfig<T>): DropdownResource<T> {
  const foundOption = getOptionsQuery.data?.find((i) => i.value === currentValue);

  const shouldFetchLabel = !isEmpty(currentValue) && !foundOption && !getOptionsQuery.isLoading;

  const getLabelQuery = useQuery<string | undefined | null>({
    queryKey: [...labelQueryKey, currentValue],
    queryFn: () => {
      if (isEmpty(currentValue) || getOptionsQuery.isLoading) {
        return Promise.resolve('');
      }

      const labelInOptions = getOptionsQuery.data?.find((i) => i.value === currentValue)?.label;

      if (!isEmpty(labelInOptions)) {
        return Promise.resolve(labelInOptions);
      }

      return getLabelFn(currentValue);
    },
    enabled: shouldFetchLabel,
  });

  const inputLabel = foundOption?.label ?? getLabelQuery.data ?? '';

  const prevInputLabel = usePreviousValue(inputLabel);

  const state = useMemo(() => {
    const statuses = [
      getOptionsQuery.status,
      !getLabelQuery.isEnabled ? 'success' : getLabelQuery.status,
      getTotalCountQuery.status,
    ];

    if (statuses.every((status) => status === 'success')) {
      return PromiseState.Success;
    }

    if (statuses.includes('error')) {
      return PromiseState.Error;
    }

    return PromiseState.Loading;
  }, [getOptionsQuery.status, getLabelQuery.status, getTotalCountQuery.status]);

  const errorMessage = useMemo(() => {
    const errors = [getOptionsQuery.error, getLabelQuery.error, getTotalCountQuery.error];

    const error = errors.find((error) => !!error);

    if (isEmpty(error)) {
      return undefined;
    }

    return getErrorMessage(error);
  }, [getOptionsQuery.error, getLabelQuery.error, getTotalCountQuery.error]);

  return {
    state,
    options: getOptionsQuery.data ?? [],
    totalCount: getTotalCountQuery.data ?? 0,
    inputLabel: inputLabel || prevInputLabel,
    errorMessage,
  };
}
