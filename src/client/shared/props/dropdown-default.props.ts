import { type DropdownOption } from '../models/dropdown-option.model';

export interface DropdownDefaultProps<T> {
  options: DropdownOption<T>[];
  optionListClassName?: string;
  optionClassName?: string;
  clearable?: boolean;
  'data-invalid'?: boolean;
}
