'use client';

import * as React from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { cn } from '@frontend/shared/utils/cn.util';

import { UiInputGroup } from '@frontend/ui/ui-input-group/ui-input-group';
import { UiInputGroupAddon } from '@frontend/ui/ui-input-group/ui-input-group-addon';
import { UiInputGroupInput } from '@frontend/ui/ui-input-group/ui-input-group-input';

import { UiComboboxTrigger } from './ui-combobox-trigger';
import { UiComboboxClear } from './ui-combobox-clear';
import { type ComboboxInputProps } from '@frontend/ui/ui-combobox/props/combobox-input.props';

export function UiComboboxInput({
  className,
  children,
  disabled = false,
  onClear,
  hasValue,
  'data-invalid': dataInvalid,
  ...props
}: ComboboxInputProps) {
  return (
    <UiInputGroup
      className={cn('w-auto', className)}
      data-invalid={dataInvalid}
    >
      <ComboboxPrimitive.Input
        render={
          <UiInputGroupInput
            className="w-full"
            disabled={disabled}
          />
        }
        {...props}
      />
      <UiInputGroupAddon align="inline-end">
        <UiComboboxTrigger data-slot="input-group-button" />
        {onClear && hasValue && (
          <UiComboboxClear
            disabled={disabled}
            onClick={onClear}
          />
        )}
      </UiInputGroupAddon>
      {children}
    </UiInputGroup>
  );
}
