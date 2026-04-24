'use client';

import type { IdPromiseParamsModel } from '@frontend/shared/models/id-params.model';
import { useRegularTransactions } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';
import { useRouter } from 'next/navigation';
import { RegularPaymentForm } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-card-form';
import { FinFormScreenHandler } from '@frontend/components/form-screen-handler/fin-form-screen-handler';

export default function EditCardForm({ params }: IdPromiseParamsModel) {
  const router = useRouter();
  const { getById } = useRegularTransactions();

  return (
    <FinFormScreenHandler
      params={params}
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
