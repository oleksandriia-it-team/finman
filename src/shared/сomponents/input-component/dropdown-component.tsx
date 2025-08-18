'use client';

import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { DropdownInputProps } from '../models/input-model';

//Dropdown-component. This component takes props such as value, classname etc.
//These props are declared in interface that located in ../models


export default function DropdownComponent({ value, className, placeholder, onChange, options }: DropdownInputProps) {

  return <>
    <Dropdown className={ `DropDownComponent ${ className || '' } ` }
      placeholder={ placeholder }
      value={ value }
      onChange={ (event: DropdownChangeEvent) => onChange(event.value) }
      options={ options }
      optionLabel="name"
    />
  </>;
}