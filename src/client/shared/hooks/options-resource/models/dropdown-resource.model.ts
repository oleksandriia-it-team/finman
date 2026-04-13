import { type PromiseState } from '../../../enums/promise-state.enum';
import { type DropdownOption } from '../../../models/dropdown-option.model';
import { type UseQueryResult } from '@tanstack/react-query';

export interface DropdownResourceConfig<T, Multiple extends boolean = false> {
  multiple?: Multiple;
  currentValue: (Multiple extends true ? T[] : T) | undefined | null;
  getTotalCountQuery?: UseQueryResult<number, Error>;
  getOptionsQuery: UseQueryResult<DropdownOption<T>[], Error>;
  getLabelFn: (
    value: Multiple extends true ? T[] : T,
  ) => Promise<(Multiple extends true ? DropdownOption<T>[] : DropdownOption<T>) | undefined | null>;
  onGetLabel?: (label: Multiple extends true ? DropdownOption<T>[] : DropdownOption<T>) => void;
  labelQueryKey: string[];
}

export interface DropdownResource<T, Multiple extends boolean = false> {
  state: PromiseState;
  errorMessage: string | undefined | null;
  totalCount: number;
  options: DropdownOption<T>[];
  inputLabel: (Multiple extends true ? DropdownOption<T>[] : DropdownOption<T>) | undefined | null;
}
