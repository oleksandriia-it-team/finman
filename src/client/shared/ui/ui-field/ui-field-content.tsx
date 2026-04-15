import { type ComponentProps } from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/ui-field-content-styles.scss';

export function UiFieldContent({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-content"
      className={cn('group/field-content field-content', className)}
      {...props}
    />
  );
}
