import { DropdownOption } from '../models/dropdown-option.model';

export interface DropdownDefaultProps<T> {
  options: DropdownOption<T>[];
  optionListClassName?: string;
  optionClassName?: string;
  wrapperClassName?: string;
}
