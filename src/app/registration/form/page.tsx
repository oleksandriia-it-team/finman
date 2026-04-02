'use client';

import { FormProvider } from 'react-hook-form';
import { useSetupRegistration } from './shared/registration-form';
import { useRouter } from 'next/navigation';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiFieldSet } from '@frontend/ui/ui-field/ui-field-set';
import { UiFieldLegend } from '@frontend/ui/ui-field/ui-field-legend';
import { UiFieldGroup } from '@frontend/ui/ui-field/ui-field-group';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input/fin-controlled-input';
import { FinControlledDropdown } from '@frontend/components/controlled-fields/fin-controlled-dropdown/fin-controlled-dropdown';

export default function RegistrationPage() {
  const router = useRouter();

  const { methods, submit } = useSetupRegistration(() => {
    router.push('/profile');
  });

  const languages = [
    { label: 'English', value: 'English' },
    { label: 'Spanish', value: 'Spanish' },
    { label: 'Ukrainian', value: 'Ukrainian' },
  ];

  const formats = [
    { label: 'USD', value: 'USD' },
    { label: 'EUR', value: 'EUR' },
    { label: 'UAH', value: 'UAH' },
  ];

  return (
    <div className="w-full h-full px-35 flex items-center justify-center bg-card">
      <FormProvider {...methods}>
        <UiFieldSet
          className="min-w-50 max-w-72 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <UiFieldLegend className="!text-xl text-center">Введіть основну інформацію</UiFieldLegend>

          <UiFieldGroup>
            <FinControlledInput
              label="Введіть ваше імʼя"
              id="userName"
              name="userName"
              placeholder="Імʼя"
            />

            <FinControlledDropdown
              label="Оберіть формат часу"
              id="formats"
              name="formats"
              placeholder="Бажаний формат часу"
              options={formats}
            />

            <FinControlledDropdown
              label="Оберіть мову"
              id="language"
              name="language"
              placeholder="Мова"
              options={languages}
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
      </FormProvider>
    </div>
  );
}
