'use client';

import { LazyDropdownInputProps } from '../props/input.props';
import { Ref, useEffect, useMemo, useState } from 'react';
import { DropdownOption } from '../../../models/dropdown-option.model';
import { UiLazyLoad } from '@frontend/ui/ui-lazy-load/ui-lazy-load';
import { UiSelectItem } from '@frontend/ui/ui-select/ui-select-item';
import { UiSelect } from '@frontend/ui/ui-select/ui-select';
import { UiSelectTrigger } from '@frontend/ui/ui-select/ui-select-trigger';
import { UiSelectValue } from '@frontend/ui/ui-select/ui-select-value';
import { UiSelectContent } from '@frontend/ui/ui-select/ui-select-content';
import { UiSelectGroup } from '@frontend/ui/ui-select/ui-select-group';

export function FinLazyDropdown<T>({
  onChange,
  options,
  optionListClassName,
  optionClassName,
  className,
  placeholder,
  customInputValue,
  value,
  id,
  isLoading,
  total,
  setPage,
  page,
  pageSize,
  itemHeight,
  ref,
  'data-invalid': dataInvalid,
  ...props
}: LazyDropdownInputProps<T>) {
  const [show, setVisibility] = useState<boolean>(false);

  const [showOptions, setShowOptions] = useState<DropdownOption<T>[]>([]);

  useEffect(() => {
    if (!show) {
      setPage(1);
      setShowOptions([]);
    }
  }, [setPage, show]);

  const inputValue = useMemo(() => {
    if (customInputValue) {
      return customInputValue;
    }

    return options.find((option) => option.value === value)?.label;
  }, [customInputValue, value, options]);

  const optionsTemplate = useMemo(() => {
    return (
      <UiSelectGroup className={optionListClassName}>
        <UiLazyLoad
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          total={total}
          itemHeight={itemHeight}
          setShowOptions={setShowOptions}
          showOptions={showOptions}
          newOptions={options}
        >
          {showOptions.map((option) => (
            <UiSelectItem
              key={option.label}
              className={optionClassName}
              value={option.label}
            >
              {option.label}
            </UiSelectItem>
          ))}
        </UiLazyLoad>
      </UiSelectGroup>
    );
  }, [
    optionListClassName,
    isLoading,
    page,
    setPage,
    pageSize,
    total,
    itemHeight,
    showOptions,
    options,
    optionClassName,
  ]);

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
        ref={ref as Ref<HTMLButtonElement>}
        data-invalid={dataInvalid}
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
