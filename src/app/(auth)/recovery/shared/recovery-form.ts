import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ApiResultOperation } from '@common/models/api-result-operation.model';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ForgotPasswordDto, ForgotPasswordSchema } from '@common/domains/auth/schema/forgot-password.schema';
import { useRecoveryStore } from '@frontend/entities/auth/recovery.store';

export function useSetupForgotPassword(onSuccessAction: () => void) {
  const setEmail = useRecoveryStore((state) => state.setEmail);

  const { mutate, isPending } = useSendDataFetch(
    async (data: ForgotPasswordDto) =>
      await fetchClient.post<ApiResultOperation<boolean>>('/api/auth/recovery/request', data, { skipAuth: true }),
    {
      successMessage: 'Код відновлення надіслано!',
      onSuccess: (result) => {
        if (result.status === 200) {
          const emailValue = methods.getValues('email');
          setEmail(emailValue);

          onSuccessAction();
        }
      },
    },
  );

  const methods = useForm<ForgotPasswordDto>({
    resolver: zodResolver(ForgotPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const submit = methods.handleSubmit((data) => {
    mutate(data);
  });

  return { methods, submit, isLoading: isPending };
}
