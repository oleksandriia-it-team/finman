export function getMinMaxDates(
  from: Date | undefined,
  to: Date | undefined,
  defaultMin?: Date | undefined,
  defaultMax?: Date | undefined,
) {
  if (!from && !to) {
    return { minDate: defaultMin, maxDate: defaultMax };
  }

  if (!from) {
    return { minDate: defaultMin, maxDate: to };
  }

  if (!to) {
    return { minDate: from, maxDate: defaultMax };
  }

  const isFromEarlier = from.getTime() <= to.getTime();

  return {
    minDate: isFromEarlier ? from : to,
    maxDate: isFromEarlier ? to : from,
  };
}
