import * as React from 'react';
import { cn } from '@frontend/shared/utils/cn.util';
import { useStepper } from '@frontend/ui/ui-stepper/hooks/stepper-context.hook';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';

export function UiStepperPrev({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: React.ComponentProps<typeof UiIconButton>) {
  const { orientation, scrollPrev, canScrollPrev } = useStepper();

  return (
    <UiIconButton
      name="arrow-left"
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -left-12 -translate-y-1/2'
          : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    />
  );
}
