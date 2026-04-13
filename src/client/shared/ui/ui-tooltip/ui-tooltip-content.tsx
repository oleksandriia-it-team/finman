'use client';

import * as React from 'react';
import { Tooltip as TooltipPrimitive } from 'radix-ui';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/ui-tooltip-content-styles.scss';

function UiTooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          'tooltip-content',
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="tooltip-arrow" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { UiTooltipContent };
