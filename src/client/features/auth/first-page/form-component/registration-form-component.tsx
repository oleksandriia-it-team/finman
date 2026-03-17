'use client';

import ControlledInput from '../../../../shared/сomponents/controlled-fields/controlled-input/controled-input-component';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from './shared/validation-schema';
import ControlledDropdown from '../../../../shared/сomponents/controlled-fields/controlled-dropdown/controlled-dropdown';
import Button from '../../../../shared/сomponents/button/button';

export default function RegistrationFormComponent() {
  const methods = useForm({
    resolver: zodResolver(userSchema),
    mode: 'onChange',
    defaultValues: {
      userName: '',
      preferableLocale: '',
      language: '',
    },
  });

  const onSubmit = async (data): Promise<void> => {
    console.log(data);
  };

  const languages = [
    { label: 'English', value: 'English' },
    { label: 'Spanish', value: 'Spanish' },
    { label: 'Ukrainian', value: 'Ukrainian' },
  ];

  const formats = [
    { label: 'USD', value: 'USD' },
    { label: 'ESP', value: 'ESP' },
    { label: 'UAH', value: 'UAH' },
  ];

  return (
    <div className="w-full h-full px-35 bg-body">
      <FormProvider {...methods}>
        <form
          className="mx-[50] my-form flex flex-col align-center h-full gap-3 items-center justify-center"
          onSubmit={methods.handleSubmit(onSubmit)}
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
