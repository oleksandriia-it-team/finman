import React, { useMemo } from 'react';
import clsx from 'clsx';

interface StepperItemProps {
  children: React.ReactNode;
  isActive: boolean;
}
export default function StepperItem({ children, isActive }: StepperItemProps) {
  const classes = useMemo(() => clsx('carousel-item', isActive && 'active'), [isActive]);

  return (
    <div className={classes}>
      <div className="flex justify-center">{children}</div>
    </div>
  );
}
