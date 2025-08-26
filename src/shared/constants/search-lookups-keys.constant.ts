import { LookupsTypeEnum } from '../../app/api/lookups/shared/enums/lookups-type.enum';

export const SearchLookupsKeys: Record<LookupsTypeEnum, string[]>= {
  [LookupsTypeEnum.CountriesAndLocales]: ['id', 'country', 'locale'],
  [LookupsTypeEnum.Languages]: ['id', 'name'],
}