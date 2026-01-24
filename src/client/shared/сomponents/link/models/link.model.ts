import { ComponentDefaultProps } from '../../../models/component-props.model';

export type LinkVariant = 'warning' | 'danger' | 'info' | 'success' | 'default' | 'revert';

export interface LinkModel extends ComponentDefaultProps {
  variant: LinkVariant;
  onClick?: () => void;
  underlined?: boolean;
  href?: string;
}
