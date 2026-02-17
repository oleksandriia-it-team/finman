import { z } from 'zod';
import { LanguagesSchema } from '../schemas/languages.schema';
import { Language } from '../../../../../../common/records/languages.record';

type TotalCountSchema = z.infer<typeof LanguagesSchema.totalCountSchema>;
type GetItemsSchema = z.infer<typeof LanguagesSchema.itemsSchema>;

export const getLanguageFilters = (body: TotalCountSchema | GetItemsSchema) => {
  const { ids, excludeIds, name } = body.filters ?? {};

  const emptyFilter = () => true;

  const idsFilter = ids ? (value: Language) => ids.includes(value.id) : emptyFilter;
  const excludeIdsFilter = excludeIds ? (value: Language) => !excludeIds.includes(value.id) : emptyFilter;
  const nameFilter = name ? (value: Language) => value.name.includes(name) : emptyFilter;

  return [idsFilter, excludeIdsFilter, nameFilter].filter((fn) => fn !== emptyFilter);
};
