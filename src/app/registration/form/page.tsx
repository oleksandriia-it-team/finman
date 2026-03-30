'use client';

import ControlledInput from '../../../client/shared/сomponents/controlled-fields/controlled-input/controled-input-component';
import { FormProvider } from 'react-hook-form';
import ControlledDropdown from '../../../client/shared/сomponents/controlled-fields/controlled-dropdown/controlled-dropdown';
import Button from '../../../client/shared/сomponents/button/button';
import { useSetupRegistration } from './shared/registration-form';
import { useRouter } from 'next/navigation';

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
            <p className="text-5xl form-text">Please enter your general information</p>
          </div>
          <ControlledInput
            name="userName"
            placeholder="Username"
            className="min-w-50 max-w-72 w-full"
          />
          <ControlledDropdown
            className="min-w-50 max-w-72 w-full"
            wrapperClassName="w-full"
            name="preferableLocale"
            placeholder="Preferable Formats"
            options={formats}
          />
          <ControlledDropdown
            className="min-w-50 max-w-72 w-full"
            wrapperClassName="w-full"
            name="language"
            placeholder="Languages"
            options={languages}
          />
          <Button
            type="submit"
            className="w-full min-w-50 max-w-72"
            variant="default"
          >
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
