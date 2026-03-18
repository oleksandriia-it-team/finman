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
  nextStepOnlyOnButtonClick = true,
}: StepperProps & ChildrenComponentProps) {
  const classes = useMemo(() => clsx('carousel', 'slide', fullSize && 'size-full', className), [className, fullSize]);
  const carouselInnerClasses = useMemo(
    () => clsx('carousel-inner', 'align-content-center', 'text-center', fullSize && 'size-full'),
    [fullSize],
  );

  const stepItemsCount = Children.count(children);

  const prevButton = (
    <IconButton
      icon="chevron-compact-left"
      size="large"
      variant="default"
      className={nextStepOnlyOnButtonClick ? '' : 'carousel-control-prev'}
      bgNone={true}
      onClick={() => setStep((currentStep - 1 + stepItemsCount) % stepItemsCount)}
    />
  );

  const nextButton = (
    <IconButton
      icon="chevron-compact-right"
      size="large"
      variant="default"
      className={nextStepOnlyOnButtonClick ? '' : 'carousel-control-next'}
      bgNone={true}
      onClick={() => setStep((currentStep + 1) % stepItemsCount)}
    />
  );

  return (
    <div
      className={classes}
      id={id}
    >
      <div className={carouselInnerClasses}>{children}</div>

      {nextStepOnlyOnButtonClick && <div className="carousel-control-prev">{prevButton}</div>}

      {!nextStepOnlyOnButtonClick && prevButton}

      {nextStepOnlyOnButtonClick && <div className="carousel-control-next">{nextButton}</div>}

      {!nextStepOnlyOnButtonClick && nextButton}
    </div>
  );
}
