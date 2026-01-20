'use client';

import { DropdownInputProps } from '../models/input.model';

/**
 * DropdownComponent
 *
 * A wrapper around PrimeReact's Dropdown component that allows passing
 * value, options, placeholder, CSS class, and onChange handler.
 *
 * @param {DropdownInputProps} props - Props for the DropdownComponent.
 * @param {any} props.value - The currently selected value.
 * @param {string} [props.className] - Additional CSS classes to apply to the dropdown.
 * @param {string} [props.placeholder] - Placeholder text displayed when no option is selected.
 * @param {(value: any) => void} props.onChange - Callback triggered when the selected value changes.
 * @param {Array<any>} props.options - Array of options to display in the dropdown.
 *
 * @example
 * <DropdownComponent
 *   value={selectedFormat}
 *   placeholder="Select format"
 *   options={[{ name: 'USD' }, { name: 'EUR' }]}
 *   className="my-dropdown"
 *   onChange={(val) => setSelectedFormat(val)}
 * />
 */

export default function DropdownComponent({ value, className, placeholder, onChange, options }: DropdownInputProps) {
  // return (
  //   <>
  //     <Dropdown
  //       className={`drop-down-component ${className || ''} `}
  //       placeholder={placeholder}
  //       value={value}
  //       onChange={(event: DropdownChangeEvent) => (onChange ? event.value : null)}
  //       options={options}
  //       optionLabel="name"
  //     />
  //   </>
  // );
}
