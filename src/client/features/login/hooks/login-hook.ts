'use client';

import { type LoginDto } from '@common/domains/auth/schema/login.schema';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import { type ApiResultOperationSuccess } from '@common/models/api-result-operation.model';
import { authTokenService } from '@frontend/shared/services/user-information/auth-token.service';
import { useLoginStore } from '@frontend/features/login/hooks/login-store-hook';
import { LoginStep } from '@frontend/features/login/constants/login-step.constant';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { useRouter } from 'next/navigation';

export function useSetupLogin(onSuccessAction?: () => void | Promise<void>) {
  const { methods, setStep } = useLoginStore();
  const refreshUser = useUserInformation((state) => state.refresh);
  const router = useRouter();

  const { mutate, isPending } = useSendDataFetch(
    async (data: LoginDto) =>
      await fetchClient.post<ApiResultOperationSuccess<string>>('/api/auth/login', data, { skipAuth: true }),
    {
      successMessage: 'Вхід виконано успішно!',
      onSuccess: async (result) => {
        authTokenService.setAccessToken(result.data);

        await refreshUser();
        router.push('/profile');

        onSuccessAction?.();
      },
      onError: (error) => {
        if (error.message === "Двофакторна аутентифікація увімкнена, код обов'язковий") {
          setStep(LoginStep.TwoFactor);
        }
      },
    },
  );

  const submit = methods.handleSubmit((data) => {
    mutate(data);
  });

  return { submit, isLoading: isPending };
}
