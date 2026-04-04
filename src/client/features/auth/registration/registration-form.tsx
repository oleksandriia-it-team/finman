import { UiFieldSet } from '@frontend/ui/ui-field/ui-field-set';
import { UiFieldLegend } from '@frontend/ui/ui-field/ui-field-legend';
import { UiFieldGroup } from '@frontend/ui/ui-field/ui-field-group';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { FinControlledLazyAutocomplete } from '@frontend/components/controlled-fields/fin-controlled-lazy-autocomplete';
import { FinControlledDropdown } from '@frontend/components/controlled-fields/fin-controlled-dropdown';
import { SupportLanguagesLocale } from '@frontend/shared/constants/support-languages-locale.constant';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useGetLocales } from '@frontend/entities/lookups/hooks/get-locales.hook';
import { useSetupRegistration } from '../../../entities/user-information/registration-form';
import { useState } from 'react';

export function RegistrationForm() {
  const [localeSearch, setLocaleSearch] = useState<string | undefined>('');

  const router = useRouter();

  const { methods, submit } = useSetupRegistration(() => {
    router.push('/profile');
  });

  const localeDataResource = useGetLocales(localeSearch, methods.getValues('preferableLocale'));

  return (
    <FormProvider {...methods}>
      <form
        className="min-w-50 max-w-72 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <UiFieldSet>
          <UiFieldLegend
            size="lg"
            className="text-center"
          >
            Введіть основну інформацію
          </UiFieldLegend>

          <UiFieldGroup>
            <FinControlledInput
              label="Введіть ваше імʼя"
              id="userName"
              name="userName"
              placeholder="Імʼя"
            />

            <FinControlledLazyAutocomplete
              label="Оберіть формат дат"
              id="formats"
              name="preferableLocale"
              placeholder="Бажаний формат дат"
              options={localeDataResource.options}
              errorLabel={localeDataResource.errorMessage ?? ''}
              state={localeDataResource.state}
              customInputValue={localeDataResource.inputLabel}
              search={localeSearch ?? ''}
              onSearch={setLocaleSearch}
            />

            <FinControlledDropdown
              label="Оберіть мову інтерфейсу"
              id="language"
              name="language"
              placeholder="Мова інтерфейсу"
              options={SupportLanguagesLocale}
            />

            <UiButton
              type="submit"
              className="w-full min-w-50 max-w-72"
              variant="default"
            >
              Зареєструватися
            </UiButton>
          </UiFieldGroup>
        </UiFieldSet>
      </form>
    </FormProvider>
  );
}
