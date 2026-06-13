import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';

interface FormatCurrencyOptions {
  locale?: string | undefined;
  currency?: string | undefined;
  notation?: 'standard' | 'compact' | undefined;
}

const DefaultLocale = 'uk-UA';
const DefaultCurrency = 'UAH';

export function formatCurrency(value: number, options: FormatCurrencyOptions = {}): string {
  const user = useUserInformation.getState().userInformation;
  const locale = options.locale ?? (user?.language === 'en' ? 'en-US' : DefaultLocale);
  const currency = options.currency ?? user?.currencyCode ?? DefaultCurrency;
  const notation = options.notation ?? 'standard';

  return value.toLocaleString(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    notation,
  });
}
