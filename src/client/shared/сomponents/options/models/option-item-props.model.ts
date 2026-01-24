import { ComponentDefaultProps } from '../../../models/component-props.model';
import { ChildrenComponentProps } from '../../../models/component-with-chilren.model';

export type OptionItemPropsModel = ComponentDefaultProps &
  ChildrenComponentProps & {
    selected?: boolean;
    onClick: () => void;
  };
