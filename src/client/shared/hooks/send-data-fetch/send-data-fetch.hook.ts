import { type MutationFunction, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import { getErrorMessage } from '@common/utils/get-error-message.util';
import { type ApiError } from '@frontend/shared/models/api-error.model';

export function useSendDataFetch<TData = unknown, TError = ApiError, TVariables = void, TContext = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: UseMutationOptions<TData, TError, TVariables, TContext> & { successMessage?: string },
) {
  const showToast = useGlobalToast((state) => state.showToast);

  return useMutation<TData, TError, TVariables, TContext>({
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
      const message = getErrorMessage(error);

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
}
