import { LookupsTypeEnum } from '../../server/shared/enums/lookups-type.enum';
import { LookupsTypeRequest } from '../../server/shared/enums/lookups-type-request.enum';

export const LookupsEndpoints: Record<LookupsTypeEnum, string> = {
  [LookupsTypeEnum.Languages]: 'languages',
  [LookupsTypeEnum.CountriesAndLocales]: 'countries-and-locales',
  [LookupsTypeEnum.Currency]: 'currencies'
};

export const LookupsTypeEndpoints: Record<LookupsTypeRequest, string> = {
  [LookupsTypeRequest.GetById]: 'get-by-id',
  [LookupsTypeRequest.GetItems]: 'get-items',
  [LookupsTypeRequest.GetTotalItems]: 'get-total-items'
};