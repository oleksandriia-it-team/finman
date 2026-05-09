import { isEmpty } from '@common/utils/is-empty.util';

export function getDate(date: Date | undefined | null | string | number): Date | undefined {
  if (isEmpty(date)) return undefined;
  const parsedDate = new Date(date);
  return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
}
