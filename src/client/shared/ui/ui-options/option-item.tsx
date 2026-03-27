import { UiOptionItemProps } from './props/option-item.props';
import { useMemo } from 'react';
import { cn } from '../../utils/cn.util';

export default function UiOptionItem({ className, children, onClick, selected, ...props }: UiOptionItemProps) {
  const classes = useMemo(
    () => cn('dropdown-item', 'cursor-pointer', selected && 'active', className),
    [className, selected],
  );

  return (
    <li
      {...props}
      onClick={onClick}
      className={classes}
    >
      {children}
    </li>
  );
}
