'use client';

import InputComponent from '../../../shared/сomponents/input-component/input-component';
import './styles/first-page.scss';
import { useState } from 'react';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';

//Registration form for first app launch.
// This component is used by the stepper-component in first-page.tsx as content
//TODO: add validation

export default function FirstForm() {
  const [ userName, setUserName ] = useState('');
  const [ userLanguage, setUserLanguage ] = useState('');
  const [ userFormats, setUserFormats ] = useState('');
  const languages: string[] = [ 'English', 'Spanish', 'Ukrainian' ];
  const formats: string[] = [ 'USD', 'ESP', 'UAH' ];

  return (
    <form className="flex flex-col justify-center ">
      <div className=" text-center">
        <h1>Please enter your general information</h1>
      </div>
      <InputComponent placeholder={ 'Username' } className="FormInput p-inputtext-lg" value={ userName }
        onChange={ setUserName }/>
      <Dropdown className="FormInput p-inputtext-lg"
        placeholder="Preferable Formats"
        value={ userFormats }
        onChange={ (event: DropdownChangeEvent) => setUserFormats(event.value) }
        options={ formats }/>
      <Dropdown className="FormInput p-inputtext-lg"
        placeholder="Languages"
        value={ userLanguage }
        onChange={ (event: DropdownChangeEvent) => setUserLanguage(event.value) }
        options={ languages }/>
    </form>
  );
}