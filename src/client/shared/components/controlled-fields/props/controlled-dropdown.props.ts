import { type InputDefaultProps } from '../../../props/input-default.props';
import { type DefaultAutocompleteInputProps, type DefaultDropdownInputProps } from '../../fields/props/input.props';
import { type InputControlProps } from '../../../props/input-control.props';
import { type DropdownOption } from '@frontend/shared/models/dropdown-option.model';

type ControlledDefaultProps<T> = Omit<InputDefaultProps, 'value' | 'onChange'> &
  Omit<DefaultDropdownInputProps<T>, 'onChange'>;

export type ControlledDropdownProps<T> = InputControlProps & ControlledDefaultProps<T>;

export type ControlledLazyAutocompleteProps<T> = InputControlProps &
  Omit<DefaultAutocompleteInputProps<T>, 'onChange'> & {
    customInputValue: string;
  };

export type ControlledLazyMultipleAutocompleteProps<T> = Omit<
  InputControlProps & DefaultAutocompleteInputProps<T>,
  'customInputValue' | 'options' | 'onChange'
> & {
  selectedDataFull: DropdownOption<T>[];
  options: DropdownOption<T>[];
};
