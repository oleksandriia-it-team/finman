import { type MutationFunction, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import { getSafeErrorMessage } from '@common/utils/get-safe-error-message.util';
import type { AppError } from '@common/classes/app-error.class';
import { getPromiseState } from '@frontend/shared/utils/get-promise-state.util';

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

  return {
    ...mutation,
    state: getPromiseState(mutation.status),
  };
}
