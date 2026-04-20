import { type ComponentProps } from 'react';

import './styles/ui-field-group-styles.scss';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiFieldGroup({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-group"
      className={cn('group/field-group @container/field-group field-group', className)}
      {...props}
    />
  );
}
