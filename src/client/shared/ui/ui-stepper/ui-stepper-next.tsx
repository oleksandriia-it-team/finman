import * as React from 'react';
import { ComponentProps } from 'react';
import { cn } from '@frontend/shared/utils/cn.util';
import { useStepper } from '@frontend/ui/ui-stepper/hooks/stepper-context.hook';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';

export function UiStepperNext({
  className,
  variant = 'default',
  size = 'default',
  ...props
}: Omit<ComponentProps<typeof UiIconButton>, 'icon'>) {
  const { orientation, scrollNext, canScrollNext } = useStepper();

  return (
    <UiIconButton
      icon="arrow-right"
      data-slot="carousel-next"
      variant={variant}
      size={size}
      isOutlined={true}
      className={cn(
        'absolute size-8 rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -translate-y-1/2 right-0 -translate-x-1/2'
          : 'bottom-0 left-1/2 -translate-y-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    />
  );
}
