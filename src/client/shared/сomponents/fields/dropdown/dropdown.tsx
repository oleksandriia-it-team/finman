'use client';

import { DropdownInputProps } from '../props/input.props';
import { useMemo, useState } from 'react';
import DropdownTemplate from '../dropdown-template/dropdown-template';
import OptionList from '../../options/option-list';
import OptionItem from '../../options/option-item';

export default function Dropdown<T>({
  onChange,
  options,
  optionListClassName,
  optionClassName,
  customInputValue = false,
  value,
  ...props
}: DropdownInputProps<T>) {
  const [show, setVisibility] = useState<boolean>(false);

  const inputValue = useMemo(() => {
    if (customInputValue) {
      return value;
    }

    return options.find((option) => option.value === value)?.label;
  }, [customInputValue, value, options]);

  const optionsTemplate = useMemo(() => {
    return (
      <OptionList className={optionListClassName}>
        {options.map((option) => (
          <OptionItem
            key={option.label}
            className={optionClassName}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </OptionItem>
        ))}
      </OptionList>
    );
  }, [optionListClassName, options, optionClassName, onChange]);

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
