import { cn } from '@frontend/shared/utils/cn.util';
import { type FieldLegendProps } from '@frontend/ui/ui-field/props/field-legend.props';

import './styles/ui-field-legend-styles.scss';

export function UiFieldLegend({ className, size = 'default', ...props }: FieldLegendProps) {
  return (
    <legend
      data-slot="field-legend"
      data-size={size}
      className={cn('field-legend', className)}
      {...props}
    />
  );
}
