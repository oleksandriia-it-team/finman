'use client';

import '../styles/first-page.scss';
import ControlledInput from '../../../../shared/сomponents/controlled-fields/controlled-input/controled-input-component';
import DefaultDropdown from '../../../../shared/сomponents/fields/dropdown/default-dropdown';
import { FormProvider, useForm } from 'react-hook-form';

export default function RegistrationFormComponent() {
  const methods = useForm();

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
      <form className="flex flex-col justify-center ">
        <div className=" text-center">
          <p className="form-text">Please enter your general information</p>
        </div>
        <ControlledInput
          className="w-full form-input"
          name="userName"
          placeholder="Username"
        />
        <DefaultDropdown
          className="w-full form-input"
          placeholder="Preferable Formats"
          options={formats}
          onChange={(value) => console.log(value)}
        />
        <DefaultDropdown
          className="w-full form-input"
          placeholder="Languages"
          options={languages}
          onChange={(value) => console.log(value)}
        />
      </form>
    </FormProvider>
  );
}
