import { Select as SelectPrimitive } from 'radix-ui';
import { cn } from '@frontend/shared/utils/cn.util';
import { type ComponentProps } from 'react';
import { UiSelectScrollDownButton, UiSelectScrollUpButton } from './ui-select-scroll-buttons';

import './styles/select-content-styles.scss';

export function UiSelectContent({
  className,
  children,
  position = 'item-aligned',
  align = 'center',
  ...props
}: ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn('list-content select-content', position === 'popper' && 'select-content-popper', className)}
        position={position}
        align={align}
        {...props}
      >
        <UiSelectScrollUpButton />
        <SelectPrimitive.Viewport className={cn('p-1', position === 'popper' && 'select-viewport-popper')}>
          {children}
        </SelectPrimitive.Viewport>
        <UiSelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}
