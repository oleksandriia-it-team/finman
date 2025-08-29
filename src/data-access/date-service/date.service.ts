export enum DateFormatType {
  Long = 'long',
  LongWithYear = 'longWithYear',
  Short = 'short',
  ShortWithYear = 'shortWithYear',
  TimeOnly = 'timeOnly',
}

export function FormatDate(
  date: Date | string | number,
  type: DateFormatType,
  locale: string,
): string {
  const parsedDate = new Date(date);

  switch (type) {
    case DateFormatType.Long:
      return parsedDate.toLocaleString(locale, {
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    case DateFormatType.LongWithYear:
      return parsedDate.toLocaleString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    case DateFormatType.Short:
      return parsedDate.toLocaleString(locale, {
        day: '2-digit',
        month: 'short',
      });
    case DateFormatType.ShortWithYear:
      return parsedDate.toLocaleString(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    case DateFormatType.TimeOnly:
      return parsedDate.toLocaleString(locale, {
        hour: '2-digit',
        minute: '2-digit',
      });
    default:
      return parsedDate.toLocaleString(locale);
  }

}
