import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { type SignUpFormInput, SignUpFormSchema } from '@common/domains/auth/schema/sign-up-form.schema';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ApiResultOperation } from '@common/models/api-result-operation.model';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WorkMode } from '@common/enums/work-mode.enum';
import type { RegisterDto } from '@common/domains/auth/schema/register.schema';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { lookupsService } from '@frontend/entities/lookups/lookups.service';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import { useRef } from 'react';

const defaultLocale = 'en-US';

async function resolveLocale(): Promise<string> {
  const browserLocale = typeof window !== 'undefined' ? window.navigator.language : defaultLocale;
  try {
    const results = await lookupsService.getItems(LookupsTypeEnum.CountriesAndLocales, 1, 2, {
      locale: browserLocale,
    });
    const found = results.find((item) => item.locale === browserLocale);
    return found ? browserLocale : defaultLocale;
  } catch {
    return defaultLocale;
  }
}

export function useSetupRegistration(onSuccessAction: () => void) {
  const { setUserInformation, logOut } = useUserInformation();
  const isSubmittingRef = useRef(false);

  const { mutate, isPending } = useSendDataFetch(
    async (data: RegisterDto) =>
      await fetchClient.post<ApiResultOperation<boolean>, RegisterDto>('/api/auth/signup', data, { skipAuth: true }),
    {
      successMessage: 'Реєстрація успішна!',
      onSuccess: (result) => result.status === 200 && onSuccessAction(),
    },
  );

  const methods = useForm<SignUpFormInput>({
    resolver: zodResolver(SignUpFormSchema),
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
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    resolveLocale()
      .then((locale) => {
        const apiData = { ...data, locale } as SignUpFormInput;
        delete apiData.workMode;
        delete apiData.passwordConfirm;

        if (workMode === WorkMode.Offline) {
          try {
            setUserInformation({ ...apiData, locale, language: 'uk', online: false });
            onSuccessAction();
          } catch (e) {
            logOut();
            console.error('Offline save failed:', e);
          } finally {
            isSubmittingRef.current = false;
          }
          return;
        }

        mutate(apiData as RegisterDto);
      })
      .finally(() => {
        isSubmittingRef.current = false;
      });
  });

  return { methods, submit, isLoading: isPending };
}
