'use client';

import * as React from 'react';
import { cn } from '@frontend/shared/utils/utils';

function UiSheetFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  );
}

export { UiSheetFooter };
