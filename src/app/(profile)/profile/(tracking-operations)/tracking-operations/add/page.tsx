'use client';

import { useRouter } from 'next/navigation';
import { useHidePlusButton } from '@frontend/widgets/profile-mobile-navbar/use-hide-plus-button';
import { TrackingOperationForm } from '@frontend/features/tracking-operation/tracking-creation-form/tracking-operation-form';
import { useQueryClient } from '@tanstack/react-query';
import { TrackingOperationQueryKey } from '@frontend/entities/tracking-operations/tracking-operation-query-key.constant';

export default function CreateCardForm() {
  const router = useRouter();
  useHidePlusButton();
  const queryClient = useQueryClient();
  return (
    <div className="flex size-full">
      <TrackingOperationForm
        onCancel={() => router.push('/profile')}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: [TrackingOperationQueryKey] });
          router.push('/profile');
        }}
      />
    </div>
  );
}
