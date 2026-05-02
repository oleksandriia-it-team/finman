import { isEmpty } from '@common/utils/is-empty.util';

export function sortByHavingId<T extends { id?: number | undefined }>(data: T[]) {
  return {
    hasId: data.filter((i) => !isEmpty(i.id)),
    hasNoId: data.filter((i) => isEmpty(i.id)),
  };
}
