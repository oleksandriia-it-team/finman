export const isISODate = (value: unknown): boolean => {
  if (typeof value !== 'string') return false;
  return /^\d{4}-\d{2}-\d{2}/.test(value) && !isNaN(new Date(value).getTime());
};
