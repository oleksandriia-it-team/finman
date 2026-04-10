'use client';

import * as React from 'react';
import { cn } from '@frontend/shared/utils/utils';

function UiSheetHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-header"
      className={cn('flex flex-col gap-1.5 p-4', className)}
      {...props}
    />
  );
}

export { UiSheetHeader };
