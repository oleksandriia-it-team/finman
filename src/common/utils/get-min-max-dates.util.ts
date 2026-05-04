export function getMinMaxDates(from: Date | undefined, to: Date | undefined) {
  if (!from && !to) {
    return { minDate: undefined, maxDate: undefined };
  }

  if (!from) {
    return { minDate: undefined, maxDate: to };
  }

  if (!to) {
    return { minDate: from, maxDate: undefined };
  }

  const isFromEarlier = from.getTime() <= to.getTime();

  return {
    minDate: isFromEarlier ? from : to,
    maxDate: isFromEarlier ? to : from,
  };
}
