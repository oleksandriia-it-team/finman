import z from 'zod';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ApiResultOperation } from '@common/models/api-result-operation.model';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const ForgotPasswordSchema = z.object({
  email: z.string().email('Некоректний формат email').min(1, "Email обов'язковий"),
});

export type ForgotPasswordDto = z.infer<typeof ForgotPasswordSchema>;

export function useSetupForgotPassword(onSuccessAction: () => void) {
  const { mutate, isPending } = useSendDataFetch(
    async (data: ForgotPasswordDto) =>
      await fetchClient.post<ApiResultOperation<boolean>>('/api/auth/recovery/request', data),
    {
      successMessage: 'Код відновлення надіслано!',
      onSuccess: (result) => {
        if (result.status === 200) {
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
