'use client';

import InputComponent from '../../../shared/сomponents/input-component/input-component';
import './styles/first-page.scss';
import { Dropdown } from 'primereact/dropdown';
import { useFormContext, Controller } from 'react-hook-form';

//Registration form for first app launch.
// This component is used by the stepper-component in first-page.tsx as content
//TODO: add validation

export default function FirstForm() {
  const { control } = useFormContext();
  const languages: string[] = [ 'English', 'Spanish', 'Ukrainian' ];
  const formats: string[] = [ 'USD', 'ESP', 'UAH' ];

  return (
    <form className="flex flex-col justify-center ">
      <div className=" text-center">
        <p className="formText">Please enter your general information</p>
      </div>
      <Controller
        name="userName"
        control={ control }
        render={ ({ field, fieldState }) => (
          <div className="flex flex-col items-center justify-center">
            <InputComponent
              placeholder={ 'Username' }
              className="FormInput p-inputtext-lg w-full"
              value={ field.value ?? null }
              onChange={ field.onChange }
            />
            { fieldState.error && (
              <p className=" errorText ">{ fieldState.error.message }</p>
            ) }
          </div>
        ) }
      />

      <Controller
        name="preferableLocale"
        control={ control }
        render={ ({ field, fieldState }) => (
          <div className="flex flex-col items-center justify-center">
            <Dropdown
              className="FormInput p-inputtext-lg w-full"
              placeholder="Preferable Formats"
              options={ formats }
              value={ field.value ?? null }
              onChange={ (e) => field.onChange(e.value) }
            />
            { fieldState.error && (
              <p className="errorText">{ fieldState.error.message }</p>
            ) }
          </div>
        ) }
      />

      <Controller
        name="language"
        control={ control }
        render={ ({ field, fieldState }) => (
          <div className="flex flex-col items-center justify-center">
            <Dropdown
              className="FormInput p-inputtext-lg w-full"
              placeholder="Languages"
              options={ languages }
              value={ field.value ?? null }
              onChange={ (e) => field.onChange(e.value) }
            />
            { fieldState.error && (
              <p className="errorText">{ fieldState.error.message }</p>
            ) }
          </div>
        ) }
      />
    </form>
  );
}