import type { ButtonProps } from '@frontend/ui/ui-button/props/button.props';

export interface ChartFiltersButtonProps extends ButtonProps {
  icon: string;
  counter?: number;
  title: string;
}
