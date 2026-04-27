'use client';
import { useGetLocalesDropdown } from '@frontend/entities/lookups/hooks/get-locales-dropdown.hook';
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
import { UiSeparator } from '@frontend/ui/ui-separator/ui-separator';
import { useSetupRegistration } from './shared/signup-form';
import { useGetCurrenciesDropdown } from '@frontend/entities/lookups/hooks/get-currencies-dropdown.hook';
import { WORK_MODE_OPTIONS } from '@frontend/shared/constants/work-mode-options.constants';
import { WorkMode } from '@common/enums/work-mode.enum';
import { UiTooltip } from '@frontend/ui/ui-tooltip/ui-tooltip';
import { localStorageService } from '@frontend/shared/services/local-storage/local-storage.service';
import { UserInformationKey } from '@frontend/shared/constants/local-storage.contants';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { LogoSvg } from '@frontend/shared/svg/logo-svg';
import { UiTooltipContent } from '@frontend/ui/ui-tooltip/ui-tooltip-content';
import { UiTooltipTrigger } from '@frontend/ui/ui-tooltip/ui-tooltip-trigger';

export default function RegistrationPage() {
  const router = useRouter();
  const { methods, submit, isLoading } = useSetupRegistration(() => {
    const hasOfflineData = localStorageService.getItem(UserInformationKey);
    if (hasOfflineData) {
      router.push('/profile');
    } else {
      router.push('/login');
    }
  });

  const localeDataResource = useGetLocalesDropdown(methods.watch('locale'));
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
              <span className="text-sm font-semibold text-foreground block leading-tight">Створіть свій акаунт</span>
            </UiFieldLegend>

            <UiFieldGroup className="flex flex-col gap-2.5">
              <div className="grid grid-cols-1 gap-2.5">
                <UiTooltip>
                  <div>
                    <FinControlledDropdown
                      label={
                        <>
                          Режим роботи{' '}
                          <UiTooltipTrigger asChild>
                            <UiSvgIcon
                              name={'info-circle'}
                              size="sm"
                            />
                          </UiTooltipTrigger>
                        </>
                      }
                      name="workMode"
                      placeholder="Оберіть режим роботи"
                      options={WORK_MODE_OPTIONS}
                    />
                  </div>
                  <UiTooltipContent
                    side="top"
                    className="max-w-[200px] text-center"
                  >
                    <p>Онлайн: синхронізація з хмарою. Офлайн: дані тільки у вашому браузері.</p>
                  </UiTooltipContent>
                </UiTooltip>
              </div>

              <FinControlledInput
                name="name"
                label="Ім'я користувача *"
                placeholder="Мін. 8 символів"
                disabled={isLocked}
              />

              {!isOffline && (
                <>
                  <FinControlledInput
                    name="email"
                    label="Email *"
                    placeholder="Введіть email"
                    disabled={isLocked}
                  />
                  <FinControlledPassword
                    name="password"
                    label="Пароль *"
                    placeholder="Мін. 8 символів"
                    disabled={isLocked}
                  />
                  <FinControlledPassword
                    name="passwordConfirm"
                    label="Підтвердження паролю *"
                    placeholder="Підтвердіть пароль"
                    disabled={isLocked}
                  />
                </>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2">
                <FinControlledAutocomplete
                  label="Валюта *"
                  name="currencyCode"
                  placeholder="Пошук..."
                  options={currencyDataResource.options}
                  errorLabel={currencyDataResource.errorMessage ?? ''}
                  state={currencyDataResource.state}
                  customInputValue={currencyDataResource.inputLabel?.label ?? ''}
                  search={currencyDataResource.search}
                  onSearch={currencyDataResource.setSearch}
                />

                <FinControlledAutocomplete
                  label="Формат дат *"
                  name="locale"
                  placeholder="Пошук..."
                  options={localeDataResource.options}
                  errorLabel={localeDataResource.errorMessage ?? ''}
                  state={localeDataResource.state}
                  customInputValue={localeDataResource.inputLabel?.label ?? ''}
                  search={localeDataResource.search}
                  onSearch={localeDataResource.setSearch}
                />
              </div>

              <div className="flex flex-col gap-2.5 mt-1 sticky bottom-0 w-full bg-primary-foreground pt-2">
                <UiButton
                  type="submit"
                  className="w-full"
                  variant="primary"
                  size="sm"
                  disabled={isLocked || isLoading}
                >
                  {isLoading && <UiSpinner className="size-4" />}
                  {isLoading ? 'Реєстрація...' : 'Зареєструватися'}
                </UiButton>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <UiSeparator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="text-muted-foreground bg-primary-foreground px-2">або</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full text-sm text-primary font-medium hover:underline text-center"
                  onClick={() => router.push('/login')}
                >
                  Вже є акаунт? Увійти
                </button>
              </div>
            </UiFieldGroup>
          </UiFieldSet>
        </form>
      </FormProvider>
    </AuthLayout>
  );
}
