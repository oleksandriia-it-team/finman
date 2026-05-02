import { type MutationFunction, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import { useMemo } from 'react';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { getSafeErrorMessage } from '@common/utils/get-safe-error-message.util';
import type { AppError } from '@common/classes/api-error.class';

export function useSendDataFetch<TData = unknown, TError = AppError, TVariables = void, TContext = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: UseMutationOptions<TData, TError, TVariables, TContext> & { successMessage?: string },
) {
  const showToast = useGlobalToast((state) => state.showToast);

  const mutation = useMutation<TData, TError, TVariables, TContext>({
    ...options,
    mutationFn,

    onSuccess: (data, variables, onMutateResult, meta) => {
      if (options?.successMessage) {
        showToast({
          title: 'Успішно',
          description: options.successMessage,
          variant: 'default',
        });
      }
      options?.onSuccess?.(data, variables, onMutateResult, meta);
    },

    onError: (error, variables, onMutateResult, meta) => {
      const message = getSafeErrorMessage(error);

      showToast({
        title: 'Помилка запиту',
        description: message,
        variant: 'destructive',
      });

      options?.onError?.(error, variables, onMutateResult, meta);
    },

    onSettled: (data, error, variables, onMutateResult, meta) => {
      options?.onSettled?.(data, error, variables, onMutateResult, meta);
    },
  });

  const state = useMemo(() => {
    if (mutation.status === 'error') {
      return PromiseState.Error;
    }

    if (mutation.status === 'pending') {
      return PromiseState.Loading;
    }

    return PromiseState.Success;
  }, [mutation]);

  return {
    ...mutation,
    state,
  };
}
