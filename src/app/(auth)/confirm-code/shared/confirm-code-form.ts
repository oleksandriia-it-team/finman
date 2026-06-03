import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ApiResultOperation } from '@common/models/api-result-operation.model';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { useRecoveryStore } from '@frontend/entities/auth/recovery.store';
import type { VerifyCodeDto } from '@common/domains/auth/schema/recovery.schema';
import { type ConfirmCodeDto, createConfirmCodeSchema } from '@common/domains/auth/schema/confirm-code.schema';
import { useRouter } from 'next/navigation';
import { useCountdown } from '@common/utils/use-coundown.hook';
import { useTranslations } from 'next-intl';

export function useConfirmCode() {
  const router = useRouter();
  const { email, setCode } = useRecoveryStore();
  const tCV = useTranslations('auth.code.validation');

  const { timeLeft, startCountdown, isCounting } = useCountdown(30);

  const schema = useMemo(
    () =>
      createConfirmCodeSchema({
        required: tCV('required'),
        length: tCV('length'),
        numeric: tCV('numeric'),
      }),
    [tCV],
  );

  const { mutate, isPending } = useSendDataFetch(
    async (data: VerifyCodeDto) =>
      await fetchClient.post<ApiResultOperation<boolean>>('/api/auth/recovery/verify', data, { skipAuth: true }),
    {
      onSuccess: (result) => {
        if (result.status === 200) {
          setCode(methods.getValues('code'));
          router.push('/reset-password');
        } else {
          startCountdown();
        }
      },
      onError: () => {
        startCountdown();
      },
    },
  );

  const methods = useForm<ConfirmCodeDto>({
    resolver: zodResolver(schema),
  });

  const submit = methods.handleSubmit((data) => {
    if (isCounting) return;
    mutate({ code: data.code, email });
  });

  const handleGoBack = () => {
    router.push('/recovery');
  };

  return {
    methods,
    submit,
    isLoading: isPending,
    email,
    handleGoBack,
    isCounting,
    timeLeft,
  };
}
