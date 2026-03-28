'use client';

import { DefaultDropdownInputProps } from '../props/input.props';
import { useMemo, useState } from 'react';
import DropdownTemplate from '../dropdown-template/dropdown-template';
import { UiOptionList } from '@frontend/ui/ui-options/ui-option-list';
import { UiOptionItem } from '@frontend/ui/ui-options/ui-option-item';

export function DefaultDropdown<T>({
  onChange,
  options,
  optionListClassName,
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
      <UiOptionList className={optionListClassName}>
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
