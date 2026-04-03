import { ComponentProps } from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/ui-field-title-styles.scss';

export function UiFieldTitle({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-label"
      className={cn('field-title', className)}
      {...props}
    />
  );
}
