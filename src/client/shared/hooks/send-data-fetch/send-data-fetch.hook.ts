import { type MutationFunction, useMutation, type UseMutationOptions } from '@tanstack/react-query';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import { getSafeErrorMessage } from '@common/utils/get-safe-error-message.util';
import { AppError } from '@common/classes/app-error.class';
import { getPromiseState } from '@frontend/shared/utils/get-promise-state.util';
import { useTranslations } from 'next-intl';

export function useSendDataFetch<TData = unknown, TError = AppError, TVariables = void, TContext = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: UseMutationOptions<TData, TError, TVariables, TContext> & {
    successMessage?: string;
    showErrorToast?: boolean;
    showErrorToastIf?: (error: TError) => boolean;
  },
) {
  const showToast = useGlobalToast((state) => state.showToast);
  const t = useTranslations();
  const tCommon = useTranslations('common');

  const mutation = useMutation<TData, TError, TVariables, TContext>({
    ...options,
    mutationFn,

    onSuccess: (data, variables, onMutateResult, meta) => {
      if (options?.successMessage) {
        showToast({
          title: tCommon('successTitle'),
          description: options.successMessage,
          variant: 'default',
        });
      }
      options?.onSuccess?.(data, variables, onMutateResult, meta);
    },

    onError: (error, variables, onMutateResult, meta) => {
      const messageKey = getSafeErrorMessage(error);
      const messageParams = error instanceof AppError ? error.messageParams : undefined;
      const description = t(messageKey, messageParams);
      console.log(1);

      if ((options?.showErrorToast ?? true) && (options?.showErrorToastIf?.(error) ?? true)) {
        console.log(tCommon('requestErrorTitle'));
        console.log(description);
        showToast({
          title: tCommon('requestErrorTitle'),
          description,
          variant: 'destructive',
        });
      }
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
