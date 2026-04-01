'use client';

import { DefaultDropdownInputProps } from '../props/input.props';
import { useMemo, useState } from 'react';
import { UiSelectGroup } from '@frontend/ui/ui-select/ui-select-group';
import { UiSelectItem } from '@frontend/ui/ui-select/ui-select-item';
import { UiSelect } from '@frontend/ui/ui-select/ui-select';
import { UiSelectTrigger } from '@frontend/ui/ui-select/ui-select-trigger';
import { UiSelectValue } from '@frontend/ui/ui-select/ui-select-value';
import { UiSelectContent } from '@frontend/ui/ui-select/ui-select-content';

export function DefaultDropdown<T>({
  onChange,
  options,
  optionListClassName,
  optionClassName,
  customInputValue,
  value,
  id,
  className,
  placeholder,
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
            value={option.label}
          >
            {option.label}
          </UiSelectItem>
        ))}
      </UiSelectGroup>
    );
  }, [optionListClassName, options, optionClassName, onChange]);

  return (
    <UiSelect
      onValueChange={(label) => {
        if (!label) {
          return;
        }
        onChange(options.find((option) => option.label === label)?.value);
      }}
      open={show}
      onOpenChange={setVisibility}
      value={inputValue ?? ''}
    >
      <UiSelectTrigger
        className={className}
        id={id}
      >
        <UiSelectValue placeholder={placeholder}>{inputValue}</UiSelectValue>
      </UiSelectTrigger>

      <UiSelectContent
        {...props}
        className={className}
      >
        {optionsTemplate}
      </UiSelectContent>
    </UiSelect>
  );
}
