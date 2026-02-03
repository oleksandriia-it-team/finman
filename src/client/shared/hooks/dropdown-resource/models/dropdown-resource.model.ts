import { PromiseState } from '../../../enums/promise-state.enum';
import { DropdownOption } from '../../../models/dropdown-option.model';
import { UseQueryResult } from '@tanstack/react-query';

export interface DropdownResourceConfig<T> {
  currentValue: T | undefined | null;
  getTotalCountQuery: UseQueryResult<number, Error>;
  getOptionsQuery: UseQueryResult<DropdownOption<T>[], Error>;
  getLabelFn: (value: T) => Promise<string | undefined | null>;
  labelQueryKey: string[];
}

export interface DropdownResource<T> {
  state: PromiseState;
  errorMessage: string | undefined | null;
  totalCount: number;
  options: DropdownOption<T>[];
  inputLabel: string | undefined | null;
}
