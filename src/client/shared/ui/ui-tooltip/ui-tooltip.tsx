'use client';

import * as React from 'react';
import { Tooltip as TooltipPrimitive } from 'radix-ui';

function UiTooltip({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Root>) {
  return (
    <TooltipPrimitive.Root
      data-slot="tooltip"
      {...props}
    />
  );
}

export { UiTooltip };
