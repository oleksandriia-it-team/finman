import { cn } from '@frontend/shared/utils/cn.util';
import { FieldLegendProps } from '@frontend/ui/ui-field/props/field-legend.props';

import './styles/ui-field-legend-styles.scss';

export function UiFieldLegend({ className, variant = 'legend', ...props }: FieldLegendProps) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn('field-legend', className)}
      {...props}
    />
  );
}
