'use client';

import { useRegularTransactions } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';
import { useRouter } from 'next/navigation';
import { RegularPaymentForm } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-card-form';
import { useHidePlusButton } from '@frontend/widgets/profile-mobile-navbar/use-hide-plus-button';
import { FinFormScreenHandler } from '@frontend/components/screen-handlers/fin-form-screen-handler';

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
          <RegularPaymentForm
            initialData={regularEntry}
            onCancel={() => router.back()}
            onSuccess={() => router.back()}
          />
        </div>
      )}
    />
  );
}
