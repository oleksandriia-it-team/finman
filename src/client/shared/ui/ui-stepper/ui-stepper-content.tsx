import * as React from 'react';
import { cn } from '../../utils/cn.util';
import { useStepper } from '@frontend/ui/ui-stepper/hooks/stepper-context.hook';

export function UiStepperContent({ className, ...props }: React.ComponentProps<'div'>) {
  const { carouselRef, orientation } = useStepper();

  return (
    <div
      ref={carouselRef}
      className="overflow-hidden"
      data-slot="carousel-content"
    >
      <div
        className={cn('flex', orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col', className)}
        {...props}
      />
    </div>
  );
}
