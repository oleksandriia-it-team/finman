import type { Locale } from 'date-fns';
import { format } from 'date-fns';
import { enUS, uk } from 'date-fns/locale';
import { type SupportLanguages } from '@common/enums/support-languages.enum';
import { DateFormatType } from '../enums/date-type.enum';
import { isEmpty } from '@common/utils/is-empty.util';

type DateOrder = 'DMY' | 'MDY' | 'YMD';

const DateFnsLocales: Record<SupportLanguages, Locale> = {
  uk: uk,
  en: enUS,
};

function getDateOrder(regionLocale: string): DateOrder {
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat(regionLocale, {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }).formatToParts(new Date(2024, 0, 20));
  } catch {
    parts = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }).formatToParts(new Date(2024, 0, 20));
  }
  const dayIndex = parts.findIndex((p) => p.type === 'day');
  const monthIndex = parts.findIndex((p) => p.type === 'month');
  const yearIndex = parts.findIndex((p) => p.type === 'year');

  if (yearIndex < monthIndex && yearIndex < dayIndex) return 'YMD';
  if (dayIndex < monthIndex) return 'DMY';
  return 'MDY';
}

export function formatDate(
  input: Date | string | number | undefined | null,
  type: DateFormatType,
  regionLocale: string,
  language: SupportLanguages,
): string {
  if (isEmpty(input)) {
    return '';
  }

  const date = new Date(input);
  if (isNaN(date.getTime())) return '';

  const dateFnsLocale = DateFnsLocales[language];
  const order = getDateOrder(regionLocale);

  switch (type) {
    case DateFormatType.Short: {
      const patterns: Record<DateOrder, string> = { DMY: 'd MMM', MDY: 'MMM d', YMD: 'MMM d' };
      return format(date, patterns[order], { locale: dateFnsLocale });
    }
    case DateFormatType.ShortWithYear: {
      const patterns: Record<DateOrder, string> = { DMY: 'd MMM yyyy', MDY: 'MMM d, yyyy', YMD: 'yyyy MMM d' };
      return format(date, patterns[order], { locale: dateFnsLocale });
    }
    case DateFormatType.Long: {
      const patterns: Record<DateOrder, string> = { DMY: 'd MMMM, HH:mm', MDY: 'MMMM d, HH:mm', YMD: 'MMMM d, HH:mm' };
      return format(date, patterns[order], { locale: dateFnsLocale });
    }
    case DateFormatType.LongWithYear: {
      const patterns: Record<DateOrder, string> = {
        DMY: 'd MMMM yyyy, HH:mm',
        MDY: 'MMMM d, yyyy HH:mm',
        YMD: 'yyyy MMMM d, HH:mm',
      };
      return format(date, patterns[order], { locale: dateFnsLocale });
    }
    case DateFormatType.TimeOnly:
      return format(date, 'HH:mm', { locale: dateFnsLocale });
    default:
      return format(date, 'PPpp', { locale: dateFnsLocale });
  }
}
