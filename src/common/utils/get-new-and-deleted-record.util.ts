import { sortByHavingId } from '@common/utils/sort-by-having-id.util';

export function getNewAndDeletedRecords<T extends { id?: number }, S extends { id: number } | number>(
  dto: T[],
  currentSaved: S[],
) {
  const { hasId, hasNoId: newRecords } = sortByHavingId(dto);

  const deletedRecords = currentSaved.filter((i) => {
    const id = typeof i === 'number' ? i : i.id;

    return !hasId.some((item) => item.id === id);
  });

  return {
    deletedRecords,
    newRecords,
    remainedRecords: hasId.map((i) => i.id as number),
  };
}
