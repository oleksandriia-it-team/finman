'use client';

import * as React from 'react';
import { Dialog as SheetPrimitive } from 'radix-ui';
import { cn } from '@frontend/shared/utils/cn.util';

import { UiSheetPortal } from './ui-sheet-portal';
import { UiSheetOverlay } from './ui-sheet-overlay';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

import './styles/ui-sheet-content-styles.scss';

function UiSheetContent({
  className,
  children,
  side = 'right',
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left';
  showCloseButton?: boolean;
}) {
  return (
    <UiSheetPortal>
      <UiSheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        className={cn('sheet-content', className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close className="sheet-close">
            <UiSvgIcon
              aria-hidden
              size="default"
              name="x"
              className="pointer-events-none"
            />
            <span className="sr-only">Закрити</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Content>
    </UiSheetPortal>
  );
}

export { UiSheetContent };
