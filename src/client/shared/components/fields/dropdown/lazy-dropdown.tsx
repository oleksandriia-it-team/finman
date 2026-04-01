'use client';

import { LazyDropdownInputProps } from '../props/input.props';
import { useEffect, useMemo, useState } from 'react';
import DropdownTemplate from '../dropdown-template/dropdown-template';
import { DropdownOption } from '../../../models/dropdown-option.model';
import { UiLazyLoad } from '@frontend/ui/ui-lazy-load/ui-lazy-load';
import { UiSelectGroup } from '@frontend/ui/ui-select/ui-select-group';
import { UiSelectItem } from '@frontend/ui/ui-select/ui-select-item';
import { UiSelectLabel } from '@frontend/ui/ui-select/ui-select-label';

export function LazyDropdown<T>({
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
              <UiSelectLabel>{option.label}</UiSelectLabel>
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
    onChange,
  ]);

  return (
    <DropdownTemplate
      open={show}
      setOpen={setVisibility}
      value={inputValue}
      className={className}
      placeholder={placeholder}
      onChange={(label) => {
        onChange(options.find((option) => option.label === label)?.value);
      }}
      id={id}
      optionsTemplate={optionsTemplate}
    />
  );
}
