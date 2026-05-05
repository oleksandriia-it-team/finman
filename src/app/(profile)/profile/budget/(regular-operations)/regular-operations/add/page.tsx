'use client';

import { useRouter } from 'next/navigation';
import { useHidePlusButton } from '@frontend/widgets/profile-mobile-navbar/use-hide-plus-button';
import { RegularPaymentForm } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-card-form';

export default function CreateCardForm() {
  const router = useRouter();
  useHidePlusButton();
  return (
    <div className="flex size-full">
      <RegularPaymentForm
        onCancel={() => router.back()}
        onSuccess={() => router.back()}
      />
    </div>
  );
}
