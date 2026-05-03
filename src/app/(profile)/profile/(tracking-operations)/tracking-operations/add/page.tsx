'use client';

import { useRouter } from 'next/navigation';
import { useHidePlusButton } from '@frontend/widgets/profile-mobile-navbar/use-hide-plus-button';
import { TrackingOperationForm } from '@frontend/features/tracking-operation/tracking-creation-form/tracking-operation-form';

export default function CreateCardForm() {
  const router = useRouter();
  useHidePlusButton();
  return (
    <div className="flex size-full">
      <TrackingOperationForm
        onCancel={() => router.back()}
        onSuccess={() => router.back()}
      />
    </div>
  );
}
