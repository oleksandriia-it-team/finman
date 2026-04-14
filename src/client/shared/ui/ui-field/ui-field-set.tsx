import { cn } from '@frontend/shared/utils/cn.util';
import { type ComponentProps } from 'react';

import './styles/ui-field-set-styles.scss';

export function UiFieldSet({ className, ...props }: ComponentProps<'fieldset'>) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn('field-set', className)}
      {...props}
    />
  );
}
