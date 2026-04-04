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
import { useSetupRegistration } from '../../../../app/registration/form/shared/registration-form';
import { useGetLocales } from '@frontend/entities/lookups/hooks/get-locales.hook';

export function RegistrationForm() {
  const router = useRouter();

  const { methods, submit } = useSetupRegistration(() => {
    router.push('/profile');
  });

  const localeDataResource = useGetLocales();

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
              search={localeDataResource.search ?? ''}
              onSearch={localeDataResource.setSearch}
              label="Оберіть формат дат"
              id="formats"
              name="preferableLocale"
              placeholder="Бажаний формат дат"
              options={localeDataResource.resource.options}
              errorLabel={localeDataResource.resource.errorMessage ?? ''}
              state={localeDataResource.resource.state}
              customInputValue={localeDataResource.resource.inputLabel}
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
              bgNone
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
