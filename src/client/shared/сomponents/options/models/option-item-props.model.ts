import { ComponentDefaultProps } from '../../../models/component-props.model';
import { ChildrenComponentProps } from '../../../models/component-with-chilren.model';

export type OptionItemPropsModel = ComponentDefaultProps &
  ChildrenComponentProps & {
    key: string;
    selected?: boolean;
    onClick: () => void;
  };
