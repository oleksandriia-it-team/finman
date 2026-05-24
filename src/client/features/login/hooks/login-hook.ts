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
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { useMemo } from 'react';
import constate from 'constate';
import { ErrorTexts } from '@common/constants/error-texts.constant';

function useSetupLoginLogic(onSuccessAction?: () => void | Promise<void>) {
  const { methods, setStep } = useLoginStore();
  const refreshUser = useUserInformation((state) => state.refresh);
  const router = useRouter();

  const { mutate, state } = useSendDataFetch(
    async (data: LoginDto) =>
      await fetchClient.post<ApiResultOperationSuccess<string>>('/api/auth/login', data, { skipAuth: true }),
    {
      successMessage: 'Вхід виконано успішно!',
      onSuccess: async (result) => {
        authTokenService.setAccessToken(result.data);

        await refreshUser();
        await onSuccessAction?.();

        router.push('/profile');
      },
      showErrorToastIf: (error) => error.message !== ErrorTexts.TwoFactorCodeIsRequired,
      onError: (error) => {
        if (error.message === ErrorTexts.TwoFactorCodeIsRequired) {
          setStep(LoginStep.TwoFactor);
        }
      },
    },
  );

  const submit = methods.handleSubmit((data) => {
    mutate(data);
  });

  return useMemo(() => ({ submit, isLoading: state === PromiseState.Loading, state }), [state, submit]);
}

export const [SetupLoginProvider, useSetupLogin] = constate(useSetupLoginLogic);
