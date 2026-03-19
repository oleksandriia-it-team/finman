import { CurrenciesSchema } from '../schemas/currencies.schema';
import { z } from 'zod';
import { Currency } from '../../../../../../common/records/currencies.record';

type TotalCountSchema = z.infer<typeof CurrenciesSchema.totalCountSchema>;
type GetItemsSchema = z.infer<typeof CurrenciesSchema.itemsSchema>;

export function getCurrencyFilters(body: TotalCountSchema | GetItemsSchema): ((currency: Currency) => boolean)[] {
  const { ids, excludeIds, code, name, symbol } = body.filters ?? {};

  const emptyFilter = () => true;

  const idsFilter = ids ? (value: Currency) => ids.includes(value.id) : emptyFilter;
  const excludeIdsFilter = excludeIds ? (value: Currency) => !excludeIds.includes(value.id) : emptyFilter;
  const codeFilter = code ? (value: Currency) => value.currencyCode.includes(code) : emptyFilter;
  const nameFilter = name ? (value: Currency) => value.currencyName.includes(name) : emptyFilter;
  const symbolFilter = symbol ? (value: Currency) => value.currencySymbol.includes(symbol) : emptyFilter;

  return [idsFilter, excludeIdsFilter, codeFilter, nameFilter, symbolFilter].filter((fn) => fn !== emptyFilter);
}
