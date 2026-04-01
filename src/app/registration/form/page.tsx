'use client';

import { FormProvider } from 'react-hook-form';
import { useSetupRegistration } from './shared/registration-form';
import { useRouter } from 'next/navigation';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input/fin-controlled-input';
import { FinControlledDropdown } from '@frontend/components/controlled-fields/fin-controlled-dropdown/fin-controlled-dropdown';
import { UiButton } from '@frontend/ui/ui-button/ui-button';

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
    <div className="w-full h-full px-35 bg-body">
      <FormProvider {...methods}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="mx-[50px] my-form flex flex-col h-full gap-3 items-center justify-center"
        >
          <div className="text-5xl text-center">
            <p className="text-5xl form-text">Введіть основну інформацію</p>
          </div>
          <FinControlledInput
            name="userName"
            placeholder="Username"
            className="min-w-50 max-w-72 w-full"
          />
          <FinControlledDropdown
            className="min-w-50 max-w-72 w-full"
            wrapperClassName="w-full"
            name="preferableLocale"
            placeholder="Preferable Formats"
            options={formats}
          />
          <FinControlledDropdown
            className="min-w-50 max-w-72 w-full"
            wrapperClassName="w-full"
            name="language"
            placeholder="Languages"
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
        </form>
      </FormProvider>
    </div>
  );
}
