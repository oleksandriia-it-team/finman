import { ComponentDefaultProps } from '../../../props/component.props';

export type LinkVariant = 'warning' | 'danger' | 'info' | 'success' | 'default' | 'revert';

export interface LinkProps extends ComponentDefaultProps {
  variant: LinkVariant;
  onClick?: () => void;
  underlined?: boolean;
  href?: string;
}
