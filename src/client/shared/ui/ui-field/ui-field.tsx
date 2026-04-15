'use client';

import { cn } from '@frontend/shared/utils/cn.util';
import { type FieldProps } from '@frontend/ui/ui-field/props/field.props';

import './styles/ui-field-styles.scss';

export function UiField({ className, orientation = 'vertical', ...props }: FieldProps) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn('field', className)}
      {...props}
    />
  );
}
