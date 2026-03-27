'use client';

import { DefaultDropdownInputProps } from '../props/input.props';
import { useMemo, useState } from 'react';
import DropdownTemplate from '../dropdown-template/dropdown-template';
import UiOptionItem from '@frontend/ui/options/option-item';

export default function DefaultDropdown<T>({
  onChange,
  options,
  UiOptionListClassName,
  optionClassName,
  customInputValue,
  value,
  ...props
}: DefaultDropdownInputProps<T>) {
  const [show, setVisibility] = useState<boolean>(false);

  const inputValue = useMemo(() => {
    if (customInputValue) {
      return customInputValue;
    }

    return options.find((option) => option.value === value)?.label;
  }, [customInputValue, value, options]);

  const optionsTemplate = useMemo(() => {
    return (
      <UiOptionList className={UiOptionListClassName}>
        {options.map((option) => (
          <UiOptionItem
            key={option.label}
            className={optionClassName}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </UiOptionItem>
        ))}
      </UiOptionList>
    );
  }, [UiOptionListClassName, options, optionClassName, onChange]);

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
