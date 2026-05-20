'use client';

import { UiModal } from '@frontend/ui/ui-modal/ui-modal';
import { UiModalContent } from '@frontend/ui/ui-modal/ui-modal-content';
import { UiModalHeader } from '@frontend/ui/ui-modal/ui-modal-header';
import { UiModalTitle } from '@frontend/ui/ui-modal/ui-modal-title';
import { UiModalFooter } from '@frontend/ui/ui-modal/ui-modal-footer';
import { UiModalClose } from '@frontend/ui/ui-modal/ui-modal-close';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import './styles/fin-modal-wrapper.scss';
import { cn } from '@frontend/shared/utils/cn.util';
import type { FinModalFormWrapperProps } from '@frontend/components/wrappers/props/fin-modal-form-wrapper.props';

export function FinModalFormWrapper({
  isOpen,
  onClose,
  title,
  formId,
  isLoading,
  children,
  className,
}: FinModalFormWrapperProps) {
  return (
    <UiModal
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <UiModalContent className={cn('admin-modal-content', className)}>
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
