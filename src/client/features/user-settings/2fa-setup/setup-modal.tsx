import { useGetSetup2FAData } from './hooks/get-setup-2fa-data.hook';
import { useConfirm2FASetup } from './hooks/confirm-2fa-setup.hook';
import { getFirstAppError } from '@common/utils/get-first-app-error.util';
import { useCombineStates } from '@frontend/shared/hooks/combine-states/combine-states.hook';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { FinErrorShort } from '@frontend/components/error/fin-error-short';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { totpConfirmSchema } from '@common/domains/totp/totp-confirm.schema';
import { UiModalContent } from '@frontend/ui/ui-modal/ui-modal-content';
import { UiModalFooter } from '@frontend/ui/ui-modal/ui-modal-footer';
import { UiModalClose } from '@frontend/ui/ui-modal/ui-modal-close';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { FinLoaderShort } from '@frontend/components/loader/fin-loader-short';
import { ShowQrCodeTwoFactorSetupQRCode } from './show-qr-code';
import { ShowSuccessTwoFactorSetup } from './show-success';
import type { ReactNode } from 'react';
import { UiModal } from '@frontend/ui/ui-modal/ui-modal';
import { UiModalTrigger } from '@frontend/ui/ui-modal/ui-modal-trigger';
import { UiModalHeader } from '@frontend/ui/ui-modal/ui-modal-header';

export function TwoFactorSetupModal({ trigger }: { trigger: ReactNode }) {
  const form = useForm({
    resolver: zodResolver(totpConfirmSchema),
    values: {
      code: '',
    },
  });

  const { state: setupState, data: setupData, error: setupDataError } = useGetSetup2FAData();

  const { state: confirmMutateState, data: confirmMutateResult, error: confirmError, mutate } = useConfirm2FASetup();

  const safeError = getFirstAppError(setupDataError, confirmError);

  const state = useCombineStates(setupState, confirmMutateState);

  return (
    <UiModal>
      <UiModalTrigger asChild>{trigger}</UiModalTrigger>

      <UiModalHeader>1</UiModalHeader>

      <UiModalContent className="flex flex-col gap-6 justify-center">
        {state === PromiseState.Loading && <FinLoaderShort />}

        {state === PromiseState.Error && safeError && <FinErrorShort {...safeError} />}

        {state === PromiseState.Success && !!confirmMutateResult && <ShowSuccessTwoFactorSetup />}

        {state === PromiseState.Success && setupData && !confirmMutateResult && (
          <FormProvider {...form}>
            <form
              id="2fa-setup"
              onSubmit={() => mutate(form.getValues().code)}
            >
              <ShowQrCodeTwoFactorSetupQRCode data={setupData} />
            </form>
          </FormProvider>
        )}
      </UiModalContent>

      <UiModalFooter>
        {!!confirmMutateResult && (
          <UiModalClose asChild>
            <UiButton variant="primary-muted">Закрити</UiButton>
          </UiModalClose>
        )}

        {!confirmMutateResult && (
          <>
            <UiModalClose asChild>
              <UiButton>Скасувати</UiButton>
            </UiModalClose>

            <UiButton
              form="2fa-setup"
              variant="primary-muted"
              type="submit"
            >
              Підтвердити та увімкнути
            </UiButton>
          </>
        )}
      </UiModalFooter>
    </UiModal>
  );
}
