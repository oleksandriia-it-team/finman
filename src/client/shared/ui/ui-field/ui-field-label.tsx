import { cn } from '@frontend/shared/utils/cn.util';
import { UiLabel } from '@frontend/ui/ui-label/ui-label';
import { type ComponentProps } from 'react';

import './styles/ui-field-label-styles.scss';

export function UiFieldLabel({ className, ...props }: ComponentProps<typeof UiLabel>) {
  return (
    <UiLabel
      data-slot="field-label"
      className={cn('field-label', className)}
      {...props}
    />
  );
}
