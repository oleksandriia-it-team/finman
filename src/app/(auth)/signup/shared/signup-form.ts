import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { type GlobalRegisterDto, GlobalRegisterSchema } from '@common/domains/auth/schema/global-register.schema';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ApiResultOperation } from '@common/models/api-result-operation.model';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WorkMode } from '@common/enums/work-mode.enum';
import type { ApiPayload } from '@common/models/api-signup-payload';

export function useSetupRegistration(onSuccessAction: () => void) {
  const { mutate, isPending } = useSendDataFetch(
    async (data: ApiPayload) =>
      await fetchClient.post<ApiResultOperation<boolean>, ApiPayload>('/api/auth/signup', data),
    {
      successMessage: 'Реєстрація успішна!',
      onSuccess: (result) => result.status === 200 && onSuccessAction(),
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
    },
  });

  const submit = methods.handleSubmit((data) => {
    const { workMode } = data;
    if (!workMode) return;

    const apiData = { ...data } as Partial<GlobalRegisterDto>;

    delete apiData.workMode;
    delete apiData.passwordConfirm;

    localStorage.setItem('workMode', workMode);

    if (workMode === WorkMode.Offline) {
      try {
        localStorage.setItem('userInfo', JSON.stringify(apiData));
        onSuccessAction();
      } catch (e) {
        localStorage.removeItem('workMode');
        console.error('Local save error', e);
      }
      return;
    }

    mutate(apiData as ApiPayload);
  });

  return { methods, submit, isLoading: isPending };
}
