'use client';

import { DropdownInputTemplateProps } from '../props/input.props';
import { UiSelect } from '@frontend/ui/ui-select/ui-select';
import { UiSelectTrigger } from '@frontend/ui/ui-select/ui-select-trigger';
import { UiSelectValue } from '@frontend/ui/ui-select/ui-select-value';
import { UiSelectContent } from '@frontend/ui/ui-select/ui-select-content';

export default function DropdownTemplate({
  value,
  placeholder,
  optionsTemplate,
  open,
  setOpen,
  id,
  className,
  onChange,
  ...props
}: DropdownInputTemplateProps) {
  return (
    <UiSelect
      onValueChange={onChange}
      open={open}
      onOpenChange={setOpen}
    >
      <UiSelectTrigger
        className={className}
        id={id}
      >
        <UiSelectValue placeholder={placeholder}>{value}</UiSelectValue>
      </UiSelectTrigger>

      <UiSelectContent {...props}>{optionsTemplate}</UiSelectContent>
    </UiSelect>
  );
}
