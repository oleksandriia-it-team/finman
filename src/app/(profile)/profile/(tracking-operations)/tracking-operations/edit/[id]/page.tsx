'use client';

import { useRouter } from 'next/navigation';
import { useHidePlusButton } from '@frontend/widgets/profile-mobile-navbar/use-hide-plus-button';
import { TrackingOperationForm } from '@frontend/features/tracking-operation/tracking-creation-form/tracking-operation-form';
import { useTrackingOperations } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-hooks/tracking-operations.hook';
import { FinFormScreenHandler } from '@frontend/components/screen-handlers/fin-form-screen-handler';
import { useQueryClient } from '@tanstack/react-query';

export default function EditCardForm(props: PageProps<never>) {
  useHidePlusButton();
  const router = useRouter();
  const { getById } = useTrackingOperations();
  const queryClient = useQueryClient();

  return (
    <FinFormScreenHandler
      {...props}
      queryKey="regular-operations"
      getItemFn={getById}
      render={(regularEntry) => (
        <div className="flex size-full">
          <TrackingOperationForm
            initialData={regularEntry}
            onCancel={() => router.back()}
            onSuccess={() => {
              queryClient.invalidateQueries({ queryKey: ['tracking-operations'] });
              router.back();
            }}
          />
        </div>
      )}
    />
  );
}
