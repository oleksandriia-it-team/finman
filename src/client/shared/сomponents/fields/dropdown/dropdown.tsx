'use client';

import { DropdownInputProps } from '../models/input.model';
import { useMemo, useState } from 'react';
import clsx from 'clsx';
import DropdownTemplate from '../dropdown-template/dropdown-template';

export default function Dropdown<T>({
  onChange,
  options,
  optionListClassName,
  optionClassName,
  customInputValue = false,
  value,
  ...props
}: DropdownInputProps<T>) {
  const optionListClasses = useMemo(
    () => clsx('!flex', 'flex-col', 'gap-2', 'dropdown-menu', optionListClassName),
    [optionListClassName],
  );

  const [show, setVisibility] = useState<boolean>(false);

  const inputValue = useMemo(() => {
    if (customInputValue) {
      return value;
    }

    return options.find((option) => option.value === value)?.label;
  }, [customInputValue, value, options]);

  const optionClasses = useMemo(() => clsx('dropdown-item', 'cursor-pointer', optionClassName), [optionClassName]);

  const optionsTemplate = useMemo(() => {
    return (
      <ul className={optionListClasses}>
        {options.map((option) => (
          <li
            key={option.label}
            onClick={() => onChange(option.value)}
            className={optionClasses}
          >
            {option.label}
          </li>
        ))}
      </ul>
    );
  }, [optionListClasses, options, optionClasses, onChange]);

  return (
    <DropdownTemplate
      open={show}
      setOpen={setVisibility}
      value={inputValue}
      {...props}
      optionsTemplate={optionsTemplate}
    />
  );
}
