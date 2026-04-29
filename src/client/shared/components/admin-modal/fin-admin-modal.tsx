'use client';

import * as React from 'react';
import { UiModal } from '@frontend/ui/ui-modal/ui-modal';
import { UiModalContent } from '@frontend/ui/ui-modal/ui-modal-content';
import { UiModalHeader } from '@frontend/ui/ui-modal/ui-modal-header';
import { UiModalTitle } from '@frontend/ui/ui-modal/ui-modal-title';
import { UiModalDescription } from '@frontend/ui/ui-modal/ui-modal-description';
import { UiModalFooter } from '@frontend/ui/ui-modal/ui-modal-footer';
import { UiModalClose } from '@frontend/ui/ui-modal/ui-modal-close';
import { UiButton } from '@frontend/ui/ui-button/ui-button';

interface FinAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  formId: string;
  isLoading?: boolean;
}

export function UiAdminModal({ isOpen, onClose, title, description, children, formId, isLoading }: FinAdminModalProps) {
  return (
    <UiModal
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <UiModalContent className="sm:max-w-[500px]">
        <UiModalHeader>
          <UiModalTitle>{title}</UiModalTitle>
          {description && <UiModalDescription>{description}</UiModalDescription>}
        </UiModalHeader>

        <div className="py-4">{children}</div>

        <UiModalFooter>
          <UiModalClose asChild>
            <UiButton
              variant="default"
              disabled={isLoading}
            >
              Скасувати
            </UiButton>
          </UiModalClose>
          <UiButton
            type="submit"
            form={formId}
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? 'Збереження...' : 'Зберегти'}
          </UiButton>
        </UiModalFooter>
      </UiModalContent>
    </UiModal>
  );
}
