import { cn } from '../../utils/cn.util';
import { useStepper } from '@frontend/ui/ui-stepper/hooks/stepper-context.hook';
import { ComponentProps } from 'react';

export function UiStepperContent({ className, ...props }: ComponentProps<'div'>) {
  const { carouselRef, fullSize, orientation } = useStepper();

  return (
    <div
      ref={carouselRef}
      className={cn(fullSize && 'size-full', 'overflow-hidden')}
      data-slot="carousel-content"
    >
      <div
        className={cn(fullSize && 'size-full', 'flex', className, orientation === 'vertical' && 'flex-col')}
        {...props}
      />
    </div>
  );
}
