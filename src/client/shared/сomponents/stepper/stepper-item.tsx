import { ChildrenComponentProps } from '../../models/component-with-chilren.model';
import { useMemo } from 'react';
import clsx from 'clsx';

export default function StepperItem({ children, isActive }: ChildrenComponentProps & { isActive?: boolean }) {
  const classes = useMemo(() => clsx('carousel-item', isActive && 'active'), [isActive]);

  return <div className={classes}>{children}</div>;
}
