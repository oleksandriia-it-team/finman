import { StepperItemProps } from './props/stepper-item.props';
import { useMemo } from 'react';
import clsx from 'clsx';
import { ChildrenComponentProps } from '../../models/component-with-chilren.model';
import { useBootstrapAnimation } from '../../hooks/bootstrap-animation/bootstrap-animation.hook';
import { useStepper } from './stepper-context';

export default function StepperItem({ className, index, children }: StepperItemProps & ChildrenComponentProps) {
  const { currentStep } = useStepper();
  const isActive = index === currentStep;

  const { shouldRender, showElement } = useBootstrapAnimation(isActive, 300, isActive);

  const classes = useMemo(
    () => clsx(className, 'carousel-item', shouldRender && 'd-block', showElement && 'active'),
    [className, shouldRender, showElement],
  );

  const style: React.CSSProperties = {
    transition: 'opacity 300ms ease-in-out',
    opacity: showElement ? 1 : 0,
    position: shouldRender && !showElement ? 'absolute' : 'relative',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: showElement ? 1 : 0,
  };

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={classes}
      style={style}
    >
      {children}
    </div>
  );
}
