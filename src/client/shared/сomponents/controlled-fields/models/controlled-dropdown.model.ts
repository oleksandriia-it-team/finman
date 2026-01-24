import { InputDefaultProps } from '../../../models/input-default-props.model';
import { DropdownDefaultPropsModel } from '../../../models/dropdown-default-props.model';
import { InputControlProps } from '../../../models/input-control-props.model';

export type ControlledDropdownProps<T> = InputDefaultProps & DropdownDefaultPropsModel<T> & InputControlProps;
