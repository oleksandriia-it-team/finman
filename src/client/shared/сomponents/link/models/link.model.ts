import { ChildrenComponentProps } from '../../../models/component-with-chilren.model';

export type LinkVariant = 'warning' | 'danger' | 'info' | 'success' | 'default' | 'revert';

export interface LinkModel extends ChildrenComponentProps {
  className?: string;
  variant: LinkVariant;
  onClick?: () => void;
  underlined?: boolean;
  href?: string;
}
