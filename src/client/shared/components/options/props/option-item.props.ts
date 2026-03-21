import { ComponentDefaultProps } from '../../../props/component.props';
import { ChildrenComponentProps } from '../../../models/component-with-chilren.model';

export type OptionItemProps = ComponentDefaultProps &
  ChildrenComponentProps & {
    selected?: boolean;
    onClick: () => void;
  };
