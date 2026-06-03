import { useMemo } from 'react';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ApiResultOperation } from '@common/models/api-result-operation.model';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type ForgotPasswordDto, createForgotPasswordSchema } from '@common/domains/auth/schema/forgot-password.schema';
import { useRecoveryStore } from '@frontend/entities/auth/recovery.store';
import { useTranslations } from 'next-intl';

export function useSetupForgotPassword(onSuccessAction: () => void) {
  const setEmail = useRecoveryStore((state) => state.setEmail);
  const t = useTranslations('auth.recovery');
  const tV = useTranslations('auth.forgotPassword.validation');

  const schema = useMemo(
    () =>
      createForgotPasswordSchema({
        emailRequired: tV('emailRequired'),
        emailInvalid: tV('emailInvalid'),
      }),
    [tV],
  );

  const { mutate, isPending } = useSendDataFetch(
    async (data: ForgotPasswordDto) =>
      await fetchClient.post<ApiResultOperation<boolean>>('/api/auth/recovery/request', data, { skipAuth: true }),
    {
      successMessage: t('successMessage'),
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
    resolver: zodResolver(schema),
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
