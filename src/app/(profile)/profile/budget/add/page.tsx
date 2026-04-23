'use client';

import { RegularPaymentForm } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-card-form';
import { useAuthorizedUser } from '@frontend/shared/services/user-information/authorized-user.hook';
import { useRouter } from 'next/navigation';

export default function CreateCardForm() {
  const user = useAuthorizedUser();
  const router = useRouter();

  return (
    <div className="flex size-full">
      <RegularPaymentForm
        onCancel={() => router.back()}
        onSuccess={() => router.back()}
      />
    </div>
  );
}
