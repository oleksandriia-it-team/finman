import React, { useMemo } from 'react';
import { type TransformDateProps } from './props/transform-date.props';
import { defaultLocale } from '../../utils/get-preferred-locale.util';
import { FormatDate } from '../../utils/format-date.util';

export function UiTransformDate({ date, type, locale, ...props }: TransformDateProps) {
  const formatted = useMemo(() => {
    return FormatDate(date, type, locale ?? defaultLocale);
  }, [date, type, locale]);

  return <p {...props}>{formatted}</p>;
}
