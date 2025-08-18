'use client';

import { InputText } from 'primereact/inputtext';
import { InputProps } from '../models/input-model';

//InputText-component. This component takes props such as value, classname etc.
//These props are declared in interface that located in ../models

export default function InputComponent({ value, className, placeholder, onChange }: InputProps) {

  return <>
    <InputText className={ `InputComponent ${ className || '' } ` }
      placeholder={ placeholder }
      value={ value }
      onChange={ (newValue) => onChange(newValue.target.value) }
    />
  </>;
}