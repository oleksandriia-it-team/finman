'use client';

import { FieldProps } from '@frontend/ui/ui-field/props/field.props';

import './styles/ui-field-styles.scss';

export function UiField({ className, orientation = 'horizontal', ...props }: FieldProps) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={className}
      {...props}
    />
  );
}
