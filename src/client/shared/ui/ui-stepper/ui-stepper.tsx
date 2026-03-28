import { StepperProps } from './props/stepper.props';
import { Children, useMemo } from 'react';
import { ChildrenComponentProps } from '../../models/component-with-chilren.model';
import { cn } from '../../utils/cn.util';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';

export function UiStepper({
  className,
  id,
  children,
  setStep,
  currentStep,
  fullSize = true,
}: StepperProps & ChildrenComponentProps) {
  const classes = useMemo(() => cn('carousel', 'slide', fullSize && 'size-full', className), [className, fullSize]);
  const carouselInnerClasses = useMemo(
    () => cn('carousel-inner', 'align-content-center', 'text-center', fullSize && 'size-full'),
    [fullSize],
  );

  const stepItemsCount = Children.count(children);

  return (
    <div
      className={classes}
      id={id}
    >
      <div className={carouselInnerClasses}>{children}</div>

      <UiIconButton
        icon="chevron-compact-left"
        size="sm"
        className="carousel-control-prev"
        variant="default"
        bgNone={true}
        onClick={() => setStep((currentStep - 1 + stepItemsCount) % stepItemsCount)}
      />

      <UiIconButton
        icon="chevron-compact-right"
        size="sm"
        className="carousel-control-next"
        variant="default"
        bgNone={true}
        onClick={() => setStep((currentStep + 1) % stepItemsCount)}
      />
    </div>
  );
}
