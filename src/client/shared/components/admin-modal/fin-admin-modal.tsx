'use client';

import { type ReactNode } from 'react';
import { UiModal } from '@frontend/ui/ui-modal/ui-modal';
import { UiModalContent } from '@frontend/ui/ui-modal/ui-modal-content';
import { UiModalHeader } from '@frontend/ui/ui-modal/ui-modal-header';
import { UiModalTitle } from '@frontend/ui/ui-modal/ui-modal-title';
import { UiModalFooter } from '@frontend/ui/ui-modal/ui-modal-footer';
import { UiModalClose } from '@frontend/ui/ui-modal/ui-modal-close';
import { UiButton } from '@frontend/ui/ui-button/ui-button';

import './fin-admin-modal.scss';

interface UiAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  formId: string;
  isLoading?: boolean;
  children: ReactNode;
}

export function UiAdminModal({ isOpen, onClose, title, formId, isLoading, children }: UiAdminModalProps) {
  return (
    <UiModal
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <UiModalContent className="admin-modal-content">
        <UiModalHeader>
          <UiModalTitle>{title}</UiModalTitle>
        </UiModalHeader>

        {children}

        <UiModalFooter>
          <UiModalClose asChild>
            <UiButton
              type="button"
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
