'use client';

import * as React from 'react';
import { Tooltip as TooltipPrimitive } from 'radix-ui';

function UiTooltipTrigger({ ...props }: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return (
    <TooltipPrimitive.Trigger
      data-slot="tooltip-trigger"
      {...props}
    />
  );
}

export { UiTooltipTrigger };
