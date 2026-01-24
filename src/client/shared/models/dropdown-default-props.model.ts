import { DropdownOption } from './dropdown-option.model';

export interface DropdownDefaultPropsModel<T> {
  options: DropdownOption<T>[];
  optionListClassName?: string;
  optionClassName?: string;
}
