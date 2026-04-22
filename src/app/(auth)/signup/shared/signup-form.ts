import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { type GlobalRegisterDto, GlobalRegisterSchema } from '@common/domains/auth/schema/global-register.schema';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ApiResultOperation } from '@common/models/api-result-operation.model';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WorkMode } from '@common/enums/work-mode.enum';

export function useSetupRegistration(onSuccessAction: () => void) {
  const { mutate, isPending } = useSendDataFetch(
    async (data: GlobalRegisterDto) =>
      await fetchClient.post<ApiResultOperation<boolean>, GlobalRegisterDto>('/api/auth/signup', data),
    {
      successMessage: 'Реєстрація успішна! Тепер ви можете увійти.',
      onSuccess: (result) => {
        if (result.status === 200) {
          onSuccessAction();
        }
      },
    },
  );

  const methods = useForm<GlobalRegisterDto>({
    resolver: zodResolver(GlobalRegisterSchema),
    mode: 'onChange',
    shouldUnregister: true,
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      locale: '',
      currencyCode: '',
      workMode: undefined,
    } as GlobalRegisterDto,
  });

  const submit = methods.handleSubmit((data) => {
    const { workMode, ...apiData } = data;

    if (workMode) {
      localStorage.setItem('workMode', workMode);
    }

    if (workMode === WorkMode.Offline) {
      localStorage.setItem('userInfo', JSON.stringify(apiData));
      onSuccessAction();
      return;
    }

    mutate(apiData as unknown as GlobalRegisterDto);
  });

  return {
    methods,
    submit,
    isLoading: isPending,
  };
}
