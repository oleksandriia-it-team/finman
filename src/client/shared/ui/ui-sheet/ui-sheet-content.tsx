'use client';

import * as React from 'react';
import { Dialog as SheetPrimitive } from 'radix-ui';
import { cn } from '@frontend/shared/utils/cn.util';

import { UiSheetPortal } from './ui-sheet-portal';
import { UiSheetOverlay } from './ui-sheet-overlay';

import './styles/ui-sheet-content-styles.scss';
function UiSheetContent({
  className,
  children,
  side = 'right',
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left';
}) {
  return (
    <UiSheetPortal>
      <UiSheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        className={cn('sheet-content p-6', className)}
        {...props}
      >
        {children}
      </SheetPrimitive.Content>
    </UiSheetPortal>
  );
}

export { UiSheetContent };
