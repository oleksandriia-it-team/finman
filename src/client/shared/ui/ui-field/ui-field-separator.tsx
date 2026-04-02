import { cn } from '@frontend/shared/utils/cn.util';
import { UiSeparator } from '../ui-separator/ui-separator';
import { ComponentDefaultProps } from '@frontend/shared/props/component.props';

import './styles/ui-field-separator-styles.scss';

export function UiFieldSeparator({ children, className, ...props }: ComponentDefaultProps) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn('field-separator', className)}
      {...props}
    >
      <UiSeparator className="field-separator-absolute" />
      {children && (
        <span
          className="field-separator-content"
          data-slot="field-separator-content"
        >
          {children}
        </span>
      )}
    </div>
  );
}
