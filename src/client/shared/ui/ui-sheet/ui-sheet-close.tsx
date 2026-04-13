'use client';

import * as React from 'react';
import { Dialog as SheetPrimitive } from 'radix-ui';

function UiSheetClose({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) {
  return (
    <SheetPrimitive.Close
      data-slot="sheet-close"
      {...props}
    />
  );
}

export { UiSheetClose };
