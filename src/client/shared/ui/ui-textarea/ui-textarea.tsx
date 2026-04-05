import * as React from 'react';

import './styles/textarea-styles.scss';
import { cn } from '@frontend/shared/utils/cn.util';

export function UiTextarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn('basic-input basic-textarea', className)}
      {...props}
    />
  );
}
