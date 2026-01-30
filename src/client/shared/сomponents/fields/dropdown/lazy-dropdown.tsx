'use client';

import { LazyDropdownInputProps } from '../props/input.props';
import { useEffect, useMemo, useState } from 'react';
import DropdownTemplate from '../dropdown-template/dropdown-template';
import OptionList from '../../options/option-list';
import OptionItem from '../../options/option-item';
import LazyLoad from '../../lazy-load/lazy-load';
import { DropdownOption } from '../../../models/dropdown-option.model';

export default function LazyDropdown<T>({
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
      <OptionList className={optionListClassName}>
        <LazyLoad
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
          {showOptions.map((option, index) => (
            <OptionItem
              key={index}
              className={optionClassName}
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </OptionItem>
          ))}
        </LazyLoad>
      </OptionList>
    );
  }, [optionListClassName, isLoading, page, setPage, pageSize, total, showOptions, options, optionClassName, onChange]);

  return (
    <DropdownTemplate
      open={show}
      setOpen={setVisibility}
      value={inputValue}
      className={className}
      placeholder={placeholder}
      id={id}
      optionsTemplate={optionsTemplate}
    />
  );
}
