'use client';

import * as React from 'react';
import { Dialog as SheetPrimitive } from 'radix-ui';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/ui-sheet-overlay-styles.scss';

function UiSheetOverlay({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Overlay>) {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        'sheet-overlay',
        className,
      )}
      {...props}
    />
  );
}

export { UiSheetOverlay };
