import { StepperItemProps } from './props/stepper-item.props';
import { useMemo } from 'react';
import clsx from 'clsx';
import { ChildrenComponentProps } from '../../models/component-with-chilren.model';
import { useBootstrapAnimation } from '../../hooks/bootstrap-animation/bootstrap-animation.hook';

export default function StepperItem({
  className,
  step,
  currentStep,
  id,
  children,
}: StepperItemProps & ChildrenComponentProps) {
  const isActive = step === currentStep;

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

  return (
    <div
      className={classes}
      id={id}
      style={style}
    >
      {children}
    </div>
  );
}
