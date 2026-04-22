import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { type GlobalRegisterDto, GlobalRegisterSchema } from '@common/domains/auth/schema/global-register.schema';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ApiResultOperation } from '@common/models/api-result-operation.model';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WorkMode } from '@common/enums/work-mode.enum';
import type { RegisterDto } from '@common/domains/auth/schema/register.schema';
import { localStorageService } from '@frontend/shared/services/local-storage/local-storage.service';

export function useSetupRegistration(onSuccessAction: () => void) {
  const { mutate, isPending } = useSendDataFetch(
    async (data: RegisterDto) =>
      await fetchClient.post<ApiResultOperation<boolean>, RegisterDto>('/api/auth/signup', data),
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

    if (workMode === WorkMode.Offline) {
      try {
        localStorageService.setItem('userInfo', apiData);
        localStorageService.setItem('workMode', workMode);

        onSuccessAction();
      } catch (e) {
        localStorageService.removeItem('workMode');
        localStorageService.removeItem('userInfo');
        console.error('Offline save failed:', e);
      }
      return;
    }
    localStorageService.setItem('workMode', workMode);
    mutate(apiData as RegisterDto);
  });

  return { methods, submit, isLoading: isPending };
}
