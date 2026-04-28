'use client';

import * as React from 'react';
import { Dialog as SheetPrimitive } from 'radix-ui';

function UiSheetPortal({ ...props }: React.ComponentProps<typeof SheetPrimitive.Portal>) {
  return (
    <SheetPrimitive.Portal
      data-slot="sheet-portal"
      {...props}
    />
  );
}

export { UiSheetPortal };
