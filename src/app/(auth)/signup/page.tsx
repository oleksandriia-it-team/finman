'use client';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@frontend/entities/auth/auth-template';
import { UiFieldSet } from '@frontend/ui/ui-field/ui-field-set';
import { FormProvider } from 'react-hook-form';
import { UiFieldLegend } from '@frontend/ui/ui-field/ui-field-legend';
import { UiFieldGroup } from '@frontend/ui/ui-field/ui-field-group';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { FinControlledPassword } from '@frontend/components/controlled-fields/fin-controlled-password';
import { FinControlledAutocomplete } from '@frontend/components/controlled-fields/fin-controlled-autocomplete';
import { FinControlledDropdown } from '@frontend/components/controlled-fields/fin-controlled-dropdown';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSpinner } from '@frontend/ui/ui-spinner/spinner';
import { useSetupRegistration } from './shared/signup-form';
import { useGetCurrenciesDropdown } from '@frontend/entities/lookups/hooks/get-currencies-dropdown.hook';
import { WORK_MODE_OPTIONS } from '@frontend/shared/constants/work-mode-options.constants';
import { WorkMode } from '@common/enums/work-mode.enum';
import { UiTooltip } from '@frontend/ui/ui-tooltip/ui-tooltip';
import { localStorageService } from '@frontend/shared/services/local-storage/local-storage.service';
import { UserInformationKey } from '@frontend/shared/constants/local-storage.constants';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { LogoSvg } from '@frontend/shared/svg/logo-svg';
import { UiTooltipContent } from '@frontend/ui/ui-tooltip/ui-tooltip-content';
import { UiTooltipTrigger } from '@frontend/ui/ui-tooltip/ui-tooltip-trigger';
import { UiSeparatorWithLabel } from '@frontend/ui/ui-separator-with-label/ui-separator-with-label';
import { LatinUsernamePattern } from '@common/constants/latin-pattern.constant';
import { useTranslations } from 'next-intl';

export default function RegistrationPage() {
  const router = useRouter();
  const t = useTranslations('auth.signup');
  const { methods, submit, isLoading } = useSetupRegistration(() => {
    const hasOfflineData = localStorageService.getItem(UserInformationKey);
    if (hasOfflineData) {
      router.push('/profile');
    } else {
      router.push('/login');
    }
  });

  const currencyDataResource = useGetCurrenciesDropdown(methods.watch('currencyCode'));
  const workMode = methods.watch('workMode');
  const isLocked = !workMode;
  const isOffline = workMode === WorkMode.Offline;

  return (
    <AuthLayout imageSrc={'/pictures/login-picture.png'}>
      <FormProvider {...methods}>
        <form
          className="w-full flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <UiFieldSet disabled={isLoading}>
            <UiFieldLegend
              size="xl"
              className="flex flex-col items-start gap-0.5 mb-4 sticky top-0 bg-primary-foreground w-full z-10"
            >
              <div className="flex items-center gap-1.5">
                <LogoSvg
                  width={36}
                  height={36}
                />
                <span className="text-2xl text-foreground tracking-tighter font-bold">FINMAN</span>
              </div>
              <span className="text-sm font-semibold text-foreground block leading-tight">{t('title')}</span>
            </UiFieldLegend>

            <UiFieldGroup className="flex flex-col gap-2.5">
              <div className="grid grid-cols-1 gap-2.5">
                <UiTooltip>
                  <div>
                    <FinControlledDropdown
                      label={
                        <>
                          {t('workModeLabel')}{' '}
                          <UiTooltipTrigger asChild>
                            <UiSvgIcon
                              name={'info-circle'}
                              size="sm"
                            />
                          </UiTooltipTrigger>
                        </>
                      }
                      name="workMode"
                      placeholder={t('workModePlaceholder')}
                      options={WORK_MODE_OPTIONS}
                    />
                  </div>
                  <UiTooltipContent
                    side="top"
                    className="max-w-[200px] text-center"
                  >
                    <p>{t('workModeTooltip')}</p>
                  </UiTooltipContent>
                </UiTooltip>
              </div>

              <FinControlledInput
                name="name"
                label={t('nameLabel')}
                placeholder={t('namePlaceholder')}
                disabled={isLocked}
                pattern={LatinUsernamePattern}
              />

              {!isOffline && (
                <>
                  <FinControlledInput
                    name="email"
                    label={t('emailLabel')}
                    placeholder={t('emailPlaceholder')}
                    disabled={isLocked}
                  />
                  <FinControlledPassword
                    name="password"
                    label={t('passwordLabel')}
                    placeholder={t('passwordPlaceholder')}
                    disabled={isLocked}
                  />
                  <FinControlledPassword
                    name="passwordConfirm"
                    label={t('passwordConfirmLabel')}
                    placeholder={t('passwordConfirmPlaceholder')}
                    disabled={isLocked}
                  />
                </>
              )}

              <FinControlledAutocomplete
                label={t('currencyLabel')}
                name="currencyCode"
                placeholder={t('currencyPlaceholder')}
                options={currencyDataResource.options}
                errorLabel={currencyDataResource.errorMessage ?? ''}
                state={currencyDataResource.state}
                customInputValue={currencyDataResource.inputLabel?.label ?? ''}
                search={currencyDataResource.search}
                onSearch={currencyDataResource.setSearch}
                disabled={isLocked}
              />

              <div className="flex flex-col gap-2.5 mt-1 sticky bottom-0 w-full bg-primary-foreground pt-2">
                <UiButton
                  type="submit"
                  className="w-full"
                  variant="primary"
                  size="sm"
                  disabled={isLocked || isLoading}
                >
                  {isLoading && <UiSpinner className="size-4" />}
                  {isLoading ? t('submitLoading') : t('submit')}
                </UiButton>

                <UiSeparatorWithLabel label={t('or')} />

                <button
                  type="button"
                  className="w-full text-sm text-primary font-medium hover:underline text-center"
                  onClick={() => router.push('/login')}
                >
                  {t('alreadyHaveAccount')}
                </button>
              </div>
            </UiFieldGroup>
          </UiFieldSet>
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
