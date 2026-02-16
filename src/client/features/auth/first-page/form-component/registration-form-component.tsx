'use client';

import ControlledInput from '../../../../shared/сomponents/controlled-fields/controlled-input/controled-input-component';
import { FormProvider, useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { userSchema } from './shared/validation-schema';
import ControlledDropdown from '../../../../shared/сomponents/controlled-fields/controlled-dropdown/controlled-dropdown';

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
    <FormProvider {...methods}>
      <form className=" my-form flex flex-col justify-center ">
        <div className=" text-center">
          <p className="form-text">Please enter your general information</p>
        </div>
        <ControlledInput
          name="userName"
          placeholder="Username"
        />
        <ControlledDropdown
          name="preferableLocale"
          placeholder="Preferable Formats"
          options={formats}
          value={value1}
          onChange={(value) => setValue1(value)}
        />
        <ControlledDropdown
          name="language"
          placeholder="Languages"
          options={languages}
          onChange={(value) => setValue2(value)}
          value={value2}
        />
        <input
          onSubmit={onSubmit}
          type="submit"
          className=""
        />
      </form>
    </FormProvider>
  );
}
