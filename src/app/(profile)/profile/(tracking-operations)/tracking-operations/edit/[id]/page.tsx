'use client';

import { useRegularTransactions } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';
import { useRouter } from 'next/navigation';
import { FinFormScreenHandler } from '@frontend/components/form-screen-handler/fin-form-screen-handler';
import { useHidePlusButton } from '@frontend/widgets/profile-mobile-navbar/use-hide-plus-button';
import { TrackingOperationForm } from '@frontend/features/tracking-operation/tracking-creation-form/tracking-operation-form';

export default function EditCardForm(props: PageProps<never>) {
  useHidePlusButton();
  const router = useRouter();
  const { getById } = useRegularTransactions();

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
            onSuccess={() => router.back()}
          />
        </div>
      )}
    />
  );
}
