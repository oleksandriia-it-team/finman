import { useModalStore } from '@frontend/shared/hooks/modal/modal.hook';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useState } from 'react';
import { useEventKey } from '@frontend/shared/hooks/event-key/event-key-hook';
import { useBootstrapAnimation } from '@frontend/shared/hooks/bootstrap-animation/bootstrap-animation.hook';
import { cn } from '@frontend/shared/utils/cn.util';

export default function LoadModal() {
  const { isOpen, template, hideModal, onClose } = useModalStore(
    useShallow((state) => ({
      isOpen: state.isOpen,
      template: state.template,
      hideModal: state.hideModal,
      onClose: state.onClose,
    })),
  );

  const [modalRef, setModalRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && modalRef) {
      modalRef.focus();
    }
  }, [isOpen, modalRef]);

  useEventKey(modalRef, ['Escape'], () => {
    onClose?.();
    hideModal();
  });

  const {
    shouldRender,
    showElement,
    animatedData: [templateToRender],
  } = useBootstrapAnimation(isOpen, 300, false, template);

  if (!shouldRender || !templateToRender) return null;

  const wrapperModalClasses = cn('modal', showElement && 'show', 'd-block', 'fade');
  const backdropClasses = cn('modal-backdrop', 'fade', showElement && 'show');

  return (
    <>
      <div
        className={wrapperModalClasses}
        ref={setModalRef}
        onClick={(event) => {
          if (event.target === modalRef) {
            onClose?.();
            hideModal();
          }
        }}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        {templateToRender}
      </div>
      <div className={backdropClasses} />
    </>
  );
}
