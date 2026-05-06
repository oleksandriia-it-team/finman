'use client';

import { useRouter } from 'next/navigation';
import { useHidePlusButton } from '@frontend/widgets/profile-mobile-navbar/use-hide-plus-button';
import { TrackingOperationForm } from '@frontend/features/tracking-operation/tracking-creation-form/tracking-operation-form';
import { useQueryClient } from '@tanstack/react-query';

export default function CreateCardForm() {
  const router = useRouter();
  useHidePlusButton();
  const queryClient = useQueryClient();
  return (
    <div className="flex size-full">
      <TrackingOperationForm
        onCancel={() => router.back()}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ['tracking-operations'] });
          router.back();
        }}
      />
    </div>
  );
}
