import { DropdownOption } from '../models/dropdown-option.model';

export interface DropdownDefaultProps<T> {
  options: DropdownOption<T>[];
  UiOptionListClassName?: string;
  optionClassName?: string;
}
