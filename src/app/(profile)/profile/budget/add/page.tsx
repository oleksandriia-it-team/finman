'use client';

import { RegularPaymentForm } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-card-form';
import { useAuthorizedUser } from '@frontend/shared/services/user-information/authorized-user.hook';

export default function CreateCardForm() {
  const user = useAuthorizedUser();

  return <RegularPaymentForm />;
}
