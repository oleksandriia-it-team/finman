import { type ComponentProps, useMemo } from 'react';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { formatCurrency } from '@frontend/shared/utils/format-currency.util';

interface UiTransformCurrencyProps extends Omit<ComponentProps<'p'>, 'children'> {
  value: number;
  locale?: string | undefined;
  currency?: string | undefined;
}

export function FinTransformCurrency({ value, currency, locale, ...props }: UiTransformCurrencyProps) {
  const user = useUserInformation((state) => state.userInformation);

  const formatted = useMemo(() => {
    const userLocale = locale ?? user?.locale;
    const userCurrency = currency ?? user?.currencyCode;

    return formatCurrency(value, {
      ...(userLocale !== undefined && { locale: userLocale }),
      ...(userCurrency !== undefined && { currency: userCurrency }),
    });
  }, [value, locale, currency, user?.locale, user?.currencyCode]);

  return <p {...props}>{formatted}</p>;
}
