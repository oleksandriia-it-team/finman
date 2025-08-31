import { DateFormatType } from '../enums/date-type.enum';

export function FormatDate(
  input: Date | string | number,
  type: DateFormatType,
  locale: string = 'en-US'
): string {
  const date = new Date(input);
  if (isNaN(date.getTime())) return '';

  switch (type) {
    case DateFormatType.Long:
      return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);

    case DateFormatType.LongWithYear:
      return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);

    case DateFormatType.Short:
      return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'short',
      }).format(date);

    case DateFormatType.ShortWithYear:
      return new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(date);

    case DateFormatType.TimeOnly:
      return new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);

    default:
      return date.toLocaleString(locale);
  }
}