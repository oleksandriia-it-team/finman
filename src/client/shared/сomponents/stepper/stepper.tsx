import { StepperProps } from './props/stepper.props';
import { Children, useMemo } from 'react';
import clsx from 'clsx';
import { ChildrenComponentProps } from '../../models/component-with-chilren.model';
import IconButton from '../icon-button/icon-button';

export default function Stepper({
  className,
  id,
  children,
  setStep,
  currentStep,
  fullSize = true,
}: StepperProps & ChildrenComponentProps) {
  const classes = useMemo(() => clsx('carousel', 'slide', fullSize && 'size-full', className), [className, fullSize]);
  const carouselInnerClasses = useMemo(
    () => clsx('carousel-inner', 'align-content-center', 'text-center', fullSize && 'size-full'),
    [fullSize],
  );

  const stepItemsCount = Children.count(children);

  return (
    <div
      className={classes}
      id={id}
    >
      <div className={carouselInnerClasses}>{children}</div>

      <IconButton
        icon="chevron-compact-left"
        size="large"
        className="carousel-control-prev"
        variant="default"
        bgNone={true}
        onClick={() => setStep((currentStep - 1 + stepItemsCount) % stepItemsCount)}
      />

      <IconButton
        icon="chevron-compact-right"
        size="large"
        className="carousel-control-next"
        variant="default"
        bgNone={true}
        onClick={() => setStep((currentStep + 1) % stepItemsCount)}
      />
    </div>
  );
}
