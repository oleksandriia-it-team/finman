'use client';

import * as React from 'react';
import { Separator as SeparatorPrimitive } from 'radix-ui';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/separator-styles.scss';

function UiSeparator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn('separator', className)}
      {...props}
    />
  );
}

export { UiSeparator };
