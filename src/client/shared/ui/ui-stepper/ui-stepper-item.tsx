import * as React from 'react';
import { cn } from '../../utils/cn.util';
import { useStepper } from '@frontend/ui/ui-stepper/hooks/stepper-context.hook';

export function UiStepperItem({ className, ...props }: React.ComponentProps<'div'>) {
  const { orientation } = useStepper();

  return (
    <div
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-item"
      className={cn('min-w-0 shrink-0 grow-0 basis-full', orientation === 'horizontal' ? 'pl-4' : 'pt-4', className)}
      {...props}
    />
  );
}
