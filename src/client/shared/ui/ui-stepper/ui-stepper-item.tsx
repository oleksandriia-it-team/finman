import * as React from 'react';
import { cn } from '../../utils/cn.util';

export function UiStepperItem({ className, ...props }: React.ComponentProps<'fieldset'>) {
  return (
    <fieldset
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn('min-w-0 shrink-0 grow-0 basis-full border-0 p-0 m-0 min-w-0', className)}
      {...props}
    />
  );
}
