import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { type GlobalRegisterDto, GlobalRegisterSchema } from '@common/domains/auth/schema/global-register.schema';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ApiResultOperation } from '@common/models/api-result-operation.model';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WorkMode } from '@common/enums/work-mode.enum';
import type { RegisterDto } from '@common/domains/auth/schema/register.schema';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';

export function useSetupRegistration(onSuccessAction: () => void) {
  const { setUserInformation, logOut } = useUserInformation();

  const { mutateAsync, isPending } = useSendDataFetch(
    async (data: RegisterDto) =>
      await fetchClient.post<ApiResultOperation<boolean>, RegisterDto>('/api/auth/signup', data, { skipAuth: true }),
    {
      successMessage: 'Реєстрація успішна!',
      onSuccess: (result) => result.status === 200 && onSuccessAction(),
    },
  );

  const getBrowserLocale = () => {
    if (typeof navigator === 'undefined') return 'en-US';
    const nav = navigator.language || (navigator.languages && navigator.languages[0]) || 'en-US';
    const parts = String(nav).split('-');
    const lang = parts[0]?.toLowerCase() ?? 'en';
    const region = parts[1] ? String(parts[1]).toUpperCase() : undefined;
    return region ? `${lang}-${region}` : lang;
  };

  const methods = useForm<GlobalRegisterDto>({
    resolver: zodResolver(GlobalRegisterSchema),
    mode: 'onChange',
    shouldUnregister: true,
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      locale: getBrowserLocale(),
      currencyCode: '',
      workMode: undefined,
    },
  });

  const submit = methods.handleSubmit(async (data) => {
    const { workMode } = data;
    if (!workMode) return;

    const apiData = { ...data } as GlobalRegisterDto;

    delete apiData.workMode;
    delete apiData.passwordConfirm;

    if (workMode === WorkMode.Offline) {
      try {
        setUserInformation({ ...apiData, language: 'uk', online: false });

        onSuccessAction();
      } catch (e) {
        logOut();
        console.error('Не вдалося зберегти офлайн-дані:', e);
      }
      return;
    }

    try {
      await mutateAsync(apiData as RegisterDto);
    } catch (err: unknown) {
      const error = err as { message?: unknown; response?: { data?: unknown } };
      const msg = String(error?.message || error?.response?.data || '').toLowerCase();
      const indicatesLocale = msg.includes('locale') || msg.includes('локаль') || msg.includes('language');

      if (indicatesLocale) {
        try {
          const retryData = { ...apiData, locale: 'en-US' } as RegisterDto;
          await mutateAsync(retryData);
        } catch (e) {
          console.error('Не вдалося повторити реєстрацію з en-US.', e);
        }
      }
    }
  });

  return { methods, submit, isLoading: isPending };
}
