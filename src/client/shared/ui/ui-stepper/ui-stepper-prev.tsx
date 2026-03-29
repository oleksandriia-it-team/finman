import { cn } from '@frontend/shared/utils/cn.util';
import { useStepper } from '@frontend/ui/ui-stepper/hooks/stepper-context.hook';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { ComponentProps } from 'react';

export function UiStepperPrev({
  className,
  variant = 'default',
  size = 'default',
  onClick,
  disabled,
  ...props
}: Omit<ComponentProps<typeof UiIconButton>, 'icon'>) {
  const { orientation, scrollPrev, canScrollPrev } = useStepper();

  return (
    <UiIconButton
      icon="arrow-left"
      data-slot="carousel-previous"
      variant={variant}
      size={size}
      isOutlined={true}
      className={cn(
        'absolute rounded-full',
        orientation === 'horizontal'
          ? 'top-1/2 -translate-y-1/2 translate-x-1/2'
          : 'top-0 left-1/2 translate-y-1/2 rotate-90',
        className,
      )}
      disabled={!canScrollPrev || disabled}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          scrollPrev();
        }
      }}
      {...props}
    />
  );
}
