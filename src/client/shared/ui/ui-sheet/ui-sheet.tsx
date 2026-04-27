'use client';

import * as React from 'react';
import { Dialog as SheetPrimitive } from 'radix-ui';

function UiSheet({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) {
  return (
    <SheetPrimitive.Root
      data-slot="sheet"
      {...props}
    />
  );
}

export { UiSheet };
