import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginDto, LoginSchema } from '@common/domains/auth/schema/login.schema';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { LoginResponse } from '@common/domains/auth/models/responses/login.response';
import { ApiResultOperation } from '@common/models/api-result-operation.model';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';

export function useSetupLogin(onSuccessAction: () => void) {
  const { mutate, isPending } = useSendDataFetch(
    async (data: LoginDto) => await fetchClient.post<ApiResultOperation<LoginResponse>>('/api/auth/login', data),
    {
      successMessage: 'Вхід виконано успішно!',
      onSuccess: (result) => {
        if (result.status === 200) {
          document.cookie = `token=${result.data.token}; path=/; max-age=86400`;
        }
        onSuccessAction();
      },
    },
  );

  const methods = useForm<LoginDto>({
    resolver: zodResolver(LoginSchema),
    mode: 'onChange',
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const submit = methods.handleSubmit((data) => {
    mutate(data);
  });

  return { methods, submit, isLoading: isPending };
}
