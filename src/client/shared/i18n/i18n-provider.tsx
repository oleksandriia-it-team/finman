'use client';

import { NextIntlClientProvider } from 'next-intl';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { DefaultLocale, messagesByLocale } from '@frontend/shared/i18n/messages';
import { type ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';

export function I18nProvider({ children }: ChildrenComponentProps) {
  const locale = useUserInformation((state) => state.userInformation?.language) ?? DefaultLocale;

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messagesByLocale[locale]}
    >
      {children}
    </NextIntlClientProvider>
  );
}
