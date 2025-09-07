'use client';

import { InputText } from 'primereact/inputtext';
import { InputProps } from '../models/input.model';
import React from 'react';

/**
 * InputComponent
 *
 * A wrapper around PrimeReact's InputText component that allows passing
 * value, placeholder, CSS class, and onChange handler.
 *
 * @param {InputProps} props - Props for the InputComponent.
 * @param {string} [props.value] - The current value of the input.
 * @param {string} [props.className] - Additional CSS classes to apply to the input.
 * @param {string} [props.placeholder] - Placeholder text displayed when input is empty.
 * @param {(value: string) => void} props.onChange - Callback triggered when the input value changes.
 *
 * @example
 * <InputComponent
 *   value={username}
 *   placeholder="Enter username"
 *   className="my-input"
 *   onChange={(val) => setUsername(val)}
 * />
 */

export default function InputComponent({ value, className, placeholder, onChange, type }: InputProps) {

  return <>
    <InputText className={ `input-component ${ className || '' } ` }
      type={ type }
      placeholder={ placeholder }
      value={ value }
      onChange={ (newValue: React.ChangeEvent<HTMLInputElement>) => onChange && onChange(newValue) }
    />
  </>;
}