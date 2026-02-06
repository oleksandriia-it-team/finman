import { StepperItemProps } from './props/stepper-item.props';
import { useMemo } from 'react';
import clsx from 'clsx';
import { ChildrenComponentProps } from '../../models/component-with-chilren.model';

export default function StepperItem({
  className,
  step,
  currentStep,
  id,
  children,
}: StepperItemProps & ChildrenComponentProps) {
  const classes = useMemo(
    () => clsx(className, 'carousel-item', step === currentStep && 'active'),
    [className, step, currentStep],
  );

  return (
    <div
      className={classes}
      id={id}
    >
      {children}
    </div>
  );
}
