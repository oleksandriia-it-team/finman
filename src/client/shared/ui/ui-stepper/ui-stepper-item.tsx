import * as React from 'react';
import { cn } from '../../utils/cn.util';

export function UiStepperItem({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn('min-w-0 shrink-0 grow-0 basis-full', className)}
      {...props}
    />
  );
}
