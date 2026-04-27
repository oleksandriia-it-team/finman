import { useState } from 'react';
import { UiModal } from '@frontend/ui/ui-modal/ui-modal';
import { UiModalContent } from '@frontend/ui/ui-modal/ui-modal-content';
import { UiModalHeader } from '@frontend/ui/ui-modal/ui-modal-header';
import { UiModalFooter } from '@frontend/ui/ui-modal/ui-modal-footer';
import { UiModalTitle } from '@frontend/ui/ui-modal/ui-modal-title';
import { UiModalDescription } from '@frontend/ui/ui-modal/ui-modal-description';
import { UiModalTrigger } from '@frontend/ui/ui-modal/ui-modal-trigger';
import { UiModalClose } from '@frontend/ui/ui-modal/ui-modal-close';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { type ReactNode } from 'react';

interface UiConfirmModalProps {
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  trigger: ReactNode;
  confirmVariant?: 'destructive' | 'primary' | 'default';
}

export function UiConfirmModal({
  onConfirm,
  title = 'Ви впевнені?',
  description = 'Цю дію неможливо скасувати.',
  confirmLabel = 'Підтверджую',
  cancelLabel = 'Скасувати',
  trigger,
  confirmVariant = 'destructive',
}: UiConfirmModalProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <UiModal
      open={open}
      onOpenChange={setOpen}
    >
      <UiModalTrigger asChild>{trigger}</UiModalTrigger>

      <UiModalContent>
        <UiModalHeader>
          <UiModalTitle>{title}</UiModalTitle>
          <UiModalDescription>{description}</UiModalDescription>
        </UiModalHeader>

        <UiModalFooter>
          <UiModalClose asChild>
            <UiButton variant="default">{cancelLabel}</UiButton>
          </UiModalClose>
          <UiButton
            variant={confirmVariant}
            onClick={handleConfirm}
          >
            {confirmLabel}
          </UiButton>
        </UiModalFooter>
      </UiModalContent>
    </UiModal>
  );
}
