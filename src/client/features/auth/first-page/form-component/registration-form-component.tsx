'use client';

import ControlledInput from '../../../../shared/сomponents/controlled-fields/controlled-input/controled-input-component';
import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
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

  const onSubmit = async (): Promise<void> => {};

  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');

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
    <div className="w-full h-full px-35">
      <FormProvider {...methods}>
        <form
          className=" mx-[50] my-form flex flex-col align-center h-full gap-3  justify-center "
          onSubmit={onSubmit}
        >
          <div className=" text-5xl text-center">
            <p className="text-5xl form-text">Please enter your general information</p>
          </div>
          <ControlledInput
            name="userName"
            placeholder="Username"
            className=" min-w-50 h-14 text-2xl"
          />
          <ControlledDropdown
            className=" min-w-50 h-14 text-2xl"
            name="preferableLocale"
            placeholder="Preferable Formats"
            options={formats}
            value={value1}
            onChange={(value) => setValue1(value)}
          />
          <ControlledDropdown
            className=" min-w-50 h-14 text-2xl"
            name="language"
            placeholder="Languages"
            options={languages}
            onChange={(value) => setValue2(value)}
            value={value2}
          />
          <Button
            type="submit"
            className=" h-14 min-w-50"
            variant="default"
          >
            Submit
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}
