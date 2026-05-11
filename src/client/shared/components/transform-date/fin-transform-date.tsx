import React, { useMemo } from 'react';
import { type TransformDateProps } from './props/transform-date.props';
import { defaultLocale } from '../../utils/get-preferred-locale.util';
import { formatDate } from '../../utils/format-date.util';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { SupportLanguages } from '@common/enums/support-languages.enum';
import { isEmpty } from '@common/utils/is-empty.util';

export function FinTransformDate({ date, type, locale, language, ...props }: TransformDateProps) {
  const userInformation = useUserInformation((state) => state.userInformation);

  const userLocale = userInformation?.locale;
  const userLanguage = userInformation?.language;

  const formatted = useMemo(() => {
    return formatDate(
      date,
      type,
      locale ?? userLocale ?? defaultLocale,
      language ?? userLanguage ?? SupportLanguages.English,
    );
  }, [date, type, locale, userLocale, language, userLanguage]);

  if (isEmpty(date)) {
    return null;
  }

  return <span {...props}>{formatted}</span>;
}
