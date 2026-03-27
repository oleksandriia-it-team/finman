import { UiOptionItemProps } from './props/option-item.props';
import { useMemo } from 'react';
import { cn } from '../../utils/cn.util';

export default function UiOptionItem({ className, children, onClick, selected, id }: UiOptionItemProps) {
  const classes = useMemo(
    () => cn('dropdown-item', 'cursor-pointer', selected && 'active', className),
    [className, selected],
  );

  return (
    <li
      id={id}
      onClick={onClick}
      className={classes}
    >
      {children}
    </li>
  );
}
