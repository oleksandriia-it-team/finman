import { ComponentProps } from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/ui-field-description-styles.scss';

export function UiFieldDescription({ className, ...props }: ComponentProps<'p'>) {
  return (
    <p
      data-slot="field-description"
      className={cn('field-description', className)}
      {...props}
    />
  );
}
