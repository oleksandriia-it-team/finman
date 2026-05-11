'use client';

import * as React from 'react';
import { cn } from '@frontend/shared/utils/cn.util';

function UiSheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn('flex gap-1.5', className)}
      {...props}
    />
  );
}

export { UiSheetHeader };
