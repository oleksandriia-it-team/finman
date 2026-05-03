import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ApiResultOperation } from '@common/models/api-result-operation.model';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { useRecoveryStore } from '@frontend/entities/auth/recovery.store';
import type { VerifyCodeDto } from '@common/domains/auth/schema/recovery.schema';
import { type ConfirmCodeDto, ConfirmCodeSchema } from '@common/domains/auth/schema/confirm-code.schema';
import { useRouter } from 'next/navigation';

export function useConfirmCode() {
  const router = useRouter();
  const { email, setCode } = useRecoveryStore();

  const { mutate, isPending } = useSendDataFetch(
    async (data: VerifyCodeDto) =>
      await fetchClient.post<ApiResultOperation<boolean>>('/api/auth/recovery/verify', data, { skipAuth: true }),
    {
      onSuccess: (result) => {
        if (result.status === 200) {
          setCode(methods.getValues('code'));
          router.push('/reset-password');
        }
      },
    },
  );

  const methods = useForm<ConfirmCodeDto>({
    resolver: zodResolver(ConfirmCodeSchema),
  });

  const submit = methods.handleSubmit((data) => {
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
  };
}
