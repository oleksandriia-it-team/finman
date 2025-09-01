import { LookupsTypeRequest } from '../enums/lookups-type-request.enum';

export interface LookupsResponseResult<T> {
  [LookupsTypeRequest.GetById]: T | null;
  [LookupsTypeRequest.GetItems]: T[];
  [LookupsTypeRequest.GetTotalItems]: number;
}