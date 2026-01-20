import React, { useMemo } from 'react';
import { TransformDateProps } from './models/transform-date.model';
import { defaultLocale } from '../../utils/get-preferred-locale.util';
import { FormatDate } from '../../utils/format-date.util';

export default function TransformDate({ date, type, locale = defaultLocale }: TransformDateProps) {
  const formatted = useMemo(() => {
    return FormatDate(date, type, locale);
  }, [date, type, locale]);

  return <p>{formatted}</p>;
}
