import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ApiResultOperation } from '@common/models/api-result-operation.model';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { z } from 'zod';
import { useRecoveryStore } from '@frontend/entities/auth/recovery.store';
import type { VerifyCodeDto } from '@common/domains/auth/models/recovery.dto';

const ConfirmCodeSchema = z.object({
  code: z.string().length(6, 'Введіть усі 6 цифр'),
});

export type ConfirmCodeDto = z.infer<typeof ConfirmCodeSchema>;

export function useSetupConfirmCode(onSuccessAction: () => void) {
  const { email, setCode } = useRecoveryStore();

  const { mutate, isPending } = useSendDataFetch(
    async (data: VerifyCodeDto) =>
      await fetchClient.post<ApiResultOperation<boolean>>('/api/auth/recovery/verify', data, { skipAuth: true }),
    {
      onSuccess: (result) => {
        if (result.status === 200) {
          setCode(methods.getValues('code'));
          onSuccessAction();
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

  return { methods, submit, isLoading: isPending };
}
