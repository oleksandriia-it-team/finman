import { UiFieldSet } from '@frontend/ui/ui-field/ui-field-set';
import { UiFieldLegend } from '@frontend/ui/ui-field/ui-field-legend';
import { UiFieldGroup } from '@frontend/ui/ui-field/ui-field-group';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { FinControlledDropdown } from '@frontend/components/controlled-fields/fin-controlled-dropdown';
import { SupportLanguagesLocale } from '@frontend/shared/constants/support-languages-locale.constant';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { FormProvider } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useGetLocalesDropdown } from '@frontend/entities/lookups/hooks/get-locales-dropdown.hook';
import { useSetupRegistration } from '../../../entities/user-information/registration-form';
import { FinControlledAutocomplete } from '@frontend/components/controlled-fields/fin-controlled-autocomplete';

export function RegistrationForm() {
  const router = useRouter();

  const { methods, submit } = useSetupRegistration(() => {
    router.push('/profile');
  });

  const localeDataResource = useGetLocalesDropdown(methods.getValues('preferableLocale'));

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

            <FinControlledAutocomplete
              label="Оберіть формат дат"
              id="preferableLocale"
              name="preferableLocale"
              placeholder="Бажаний формат дат"
              options={localeDataResource.options}
              errorLabel={localeDataResource.errorMessage ?? ''}
              state={localeDataResource.state}
              customInputValue={localeDataResource.inputLabel?.label ?? ''}
              search={localeDataResource.search}
              onSearch={localeDataResource.setSearch}
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
