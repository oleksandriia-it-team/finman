import { PromiseState } from '../../../enums/promise-state.enum';
import { DropdownOption } from '../../../models/dropdown-option.model';
import { UseQueryResult } from '@tanstack/react-query';

export interface DropdownResourceConfig<T, Multiple extends boolean = false> {
  multiple?: Multiple;
  currentValue: (Multiple extends true ? T[] : T) | undefined | null;
  getTotalCountQuery?: UseQueryResult<number, Error>;
  getOptionsQuery: UseQueryResult<DropdownOption<T>[], Error>;
  getLabelFn: (value: Multiple extends true ? T[] : T) => Promise<(Multiple extends true ? string[] : string) | undefined | null>;
  labelQueryKey: string[];
}

export interface DropdownResource<T, Multiple extends boolean = false> {
  state: PromiseState;
  errorMessage: string | undefined | null;
  totalCount: number;
  options: DropdownOption<T>[];
  inputLabel: (Multiple extends true ? string[] : string) | undefined | null;
}
