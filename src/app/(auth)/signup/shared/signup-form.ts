import { useMemo, useRef } from 'react';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { type SignUpFormInput, createSignUpFormSchema } from '@common/domains/auth/schema/sign-up-form.schema';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import type { ApiResultOperation } from '@common/models/api-result-operation.model';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WorkMode } from '@common/enums/work-mode.enum';
import type { RegisterDto } from '@common/domains/auth/schema/register.schema';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { lookupsService } from '@frontend/entities/lookups/lookups.service';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import { useTranslations } from 'next-intl';
import { UserRequirements } from '@common/constants/user-requirements.constant';
import { CurrencyRequirements } from '@common/constants/currency-requirements.constant';

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
  const t = useTranslations('auth.signup');
  const tUV = useTranslations('auth.user.validation');
  const tSV = useTranslations('auth.signup.validation');

  const schema = useMemo(
    () =>
      createSignUpFormSchema(
        {
          emailRequired: tUV('emailRequired'),
          emailMaxLength: tUV('emailMaxLength', { max: UserRequirements.MaxEmailLength }),
          emailInvalidFormat: tUV('emailInvalidFormat'),
          nameRequired: tUV('nameRequired'),
          nameMinLength: tUV('nameMinLength', { min: UserRequirements.MinNameLength }),
          nameMaxLength: tUV('nameMaxLength', { max: UserRequirements.MaxLoginLength }),
          nameInvalidChars: tUV('nameInvalidChars'),
          passwordRequired: tUV('passwordRequired'),
          passwordMinLength: tUV('passwordMinLength', { min: UserRequirements.MinPasswordLength }),
          passwordMaxLength: tUV('passwordMaxLength', { max: UserRequirements.MaxPasswordLength }),
          passwordLatinOnly: tUV('passwordLatinOnly'),
          localeRequired: tUV('localeRequired'),
          localeFormat: tUV('localeFormat'),
          currencyRequired: tUV('currencyRequired'),
          currencyCodeLength: tUV('currencyCodeLength', { length: CurrencyRequirements.MaxCurrencyCodeLength }),
          currencyCodeFormat: tUV('currencyCodeFormat'),
        },
        {
          invalidEmail: tSV('invalidEmail'),
          workModeRequired: tSV('workModeRequired'),
          currencyRequired: tSV('currencyRequired'),
          emailRequiredOnline: tSV('emailRequiredOnline'),
          passwordMinLength: tSV('passwordMinLength', { min: UserRequirements.MinPasswordLength }),
          passwordsDoNotMatch: tSV('passwordsDoNotMatch'),
        },
      ),
    [tUV, tSV],
  );

  const { mutate, isPending } = useSendDataFetch(
    async (data: RegisterDto) =>
      await fetchClient.post<ApiResultOperation<boolean>, RegisterDto>('/api/auth/signup', data, { skipAuth: true }),
    {
      successMessage: t('successMessage'),
      onSuccess: (result) => result.status === 200 && onSuccessAction(),
      onSettled: () => {
        isSubmittingRef.current = false;
      },
    },
  );

  const methods = useForm<SignUpFormInput>({
    resolver: zodResolver(schema),
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

    resolveLocale().then((locale) => {
      const apiData = { ...data, locale } as SignUpFormInput;
      delete apiData.workMode;
      delete apiData.passwordConfirm;

      if (workMode === WorkMode.Offline) {
        try {
          setUserInformation({
            ...apiData,
            locale,
            language: 'uk',
            online: false,
            currencyCode: apiData.currencyCode!,
          });
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
    });
  });

  return { methods, submit, isLoading: isPending };
}
