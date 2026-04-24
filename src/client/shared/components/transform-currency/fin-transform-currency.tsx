import { type ComponentProps, useMemo } from 'react';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';

interface UiTransformCurrencyProps extends Omit<ComponentProps<'p'>, 'children'> {
  value: number;
  locale?: string;
  currency?: string;
}

export function FinTransformCurrency({ value, currency, locale, ...props }: UiTransformCurrencyProps) {
  const userLocale = useUserInformation((state) => state.userInformation)?.locale;

  const formatted = useMemo(() => {
    return value.toLocaleString(locale ?? userLocale ?? 'uk-UA', {
      style: 'currency',
      currency: currency ?? 'UAH',
      currencyDisplay: 'narrowSymbol',
    });
  }, [value, locale, userLocale, currency]);

  return <p {...props}>{formatted}</p>;
}
