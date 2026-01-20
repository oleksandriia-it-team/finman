'use client';

import '../styles/first-page.scss';
import ControlledInput from '../../../../shared/сomponents/controlled-fields/controlled-input/controled-input-component';
import ControlledDropdown from '../../../../shared/сomponents/controlled-fields/controlled-dropdown/controlled-dropdown';

export default function RegistrationFormComponent() {

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
    <form className="flex flex-col justify-center ">
      <div className=" text-center">
        <p className="form-text">Please enter your general information</p>
      </div>
      <ControlledInput
        className="w-full form-input"
        name="userName"
        placeholder="Username"/>
      <ControlledDropdown
        className="w-full form-input"
        name="preferableLocale"
        placeholder="Preferable Formats"
        options={ formats }/>
      <ControlledDropdown
        className="w-full form-input"
        name="language"
        placeholder="Languages"
        options={ languages }/>
    </form>
  );
}