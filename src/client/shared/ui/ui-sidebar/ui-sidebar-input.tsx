import * as React from 'react';
import { cn } from '@frontend/shared/utils/utils';
import { UiInput } from '@frontend/ui/ui-input/ui-input';

import './styles/sidebar-input-styles.scss';

export function UiSidebarInput({ className, ...props }: React.ComponentProps<typeof UiInput>) {
  return (
    <UiInput
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn('sidebar-input', className)}
      {...props}
    />
  );
}
