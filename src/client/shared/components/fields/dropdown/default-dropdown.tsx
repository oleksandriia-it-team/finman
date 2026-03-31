'use client';

import { DefaultDropdownInputProps } from '../props/input.props';
import { useMemo, useState } from 'react';
import DropdownTemplate from '../dropdown-template/dropdown-template';
import { UiSelectGroup } from '@frontend/ui/ui-select/ui-select-group';
import { UiSelectItem } from '@frontend/ui/ui-select/ui-select-item';
import { UiSelectLabel } from '@frontend/ui/ui-select/ui-select-label';

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
      <UiSelectGroup className={optionListClassName}>
        {options.map((option) => (
          <UiSelectItem
            key={option.label}
            className={optionClassName}
            onClick={() => onChange(option.value)}
            value={option.value as never}
          >
            <UiSelectLabel>{option.label}</UiSelectLabel>
          </UiSelectItem>
        ))}
      </UiSelectGroup>
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
