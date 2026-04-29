import { type LookupCreatedByFields, type LookupCreatedBy } from './lookup-created-by.model';

export function getCreatedBy<T>(item: T): LookupCreatedBy {
  const source = item as T & LookupCreatedByFields;

  const nameFromObject = typeof source.createdBy === 'object' && source.createdBy ? source.createdBy.name : undefined;
  const avatarFromObject =
    typeof source.createdBy === 'object' && source.createdBy ? source.createdBy.avatar : undefined;

  const name = source.createdByName ?? source.userName ?? nameFromObject ?? undefined;
  const avatar = source.createdByAvatar ?? source.userAvatar ?? avatarFromObject ?? undefined;

  return { name, avatar };
}
