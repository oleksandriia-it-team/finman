import React, { useMemo } from 'react';
import { TransformDateProps } from './props/transform-date.props';
import { defaultLocale } from '../../utils/get-preferred-locale.util';
import { FormatDate } from '../../utils/format-date.util';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';

export default function TransformDate({ date, type, locale }: TransformDateProps) {
  const userLocale = useUserInformation((state) => state.userInformation)?.preferableLocale;

  const formatted = useMemo(() => {
    return FormatDate(date, type, locale ?? userLocale ?? defaultLocale);
  }, [date, type, locale, userLocale]);

  return <p>{formatted}</p>;
}
