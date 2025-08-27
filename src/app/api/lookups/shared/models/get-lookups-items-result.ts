import { LookupsTypeEnum } from '../enums/lookups-type.enum';
import { LookupsTypeRequest } from '../enums/lookups-type-request.enum';

export interface LookupsResponseResult<T extends LookupsTypeEnum> {
  [LookupsTypeRequest.GetById]: T | null;
  [LookupsTypeRequest.GetItems]: T[];
  [LookupsTypeRequest.GetTotalItems]: number;
}