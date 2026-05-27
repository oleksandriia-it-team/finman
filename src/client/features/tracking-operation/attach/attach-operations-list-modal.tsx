import type { AttachOperationsListModalProps } from '@frontend/features/tracking-operation/attach/props/attach-operations-list-modal.props';
import { UiModalTrigger } from '@frontend/ui/ui-modal/ui-modal-trigger';
import { UiModal } from '@frontend/ui/ui-modal/ui-modal';
import { UiModalContent } from '@frontend/ui/ui-modal/ui-modal-content';

export function TrackingOperationAttachedOperationListModal({ trigger }: AttachOperationsListModalProps) {
  return (
    <UiModal>
      <UiModalTrigger asChild>{trigger}</UiModalTrigger>
      <UiModalContent>11</UiModalContent>
    </UiModal>
  );
}
