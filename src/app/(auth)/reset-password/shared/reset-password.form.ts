import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { useRecoveryStore } from '@frontend/entities/auth/recovery.store';
import type { ApiResultOperation } from '@common/models/api-result-operation.model';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import { type ResetPasswordDto, createResetPasswordSchema } from '@common/domains/auth/schema/reset-password.schema';
import { useTranslations } from 'next-intl';

export function useSetupResetPassword(onSuccessAction: () => void) {
  const { email, code, clear } = useRecoveryStore();
  const t = useTranslations('auth.resetPassword');
  const tV = useTranslations('auth.resetPassword.validation');

  const schema = useMemo(
    () =>
      createResetPasswordSchema({
        passwordMinLength: tV('passwordMinLength'),
        passwordsDoNotMatch: tV('passwordsDoNotMatch'),
      }),
    [tV],
  );

  const { mutate, isPending } = useSendDataFetch(
    async (data: ResetPasswordDto) =>
      await fetchClient.post<ApiResultOperation<boolean>>('/api/auth/recovery/reset', data, { skipAuth: true }),
    {
      successMessage: t('successMessage'),
      onSuccess: (result) => {
        if (result.status === 200) {
          clear();
          onSuccessAction();
        }
      },
    },
  );

  const methods = useForm<ResetPasswordDto>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email,
      code,
      password: '',
      passwordConfirm: '',
    },
  });

  const submit = methods.handleSubmit((data) => {
    mutate(data);
  });

  return { methods, submit, isLoading: isPending };
}
