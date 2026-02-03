import { useModalStore } from '../client/shared/hooks/modal/modal.hook';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useState } from 'react';
import { useEventKey } from '../client/shared/hooks/event-key/event-key-hook';
import { useBootstrapAnimation } from '../client/shared/hooks/bootstrap-animation/bootstrap-animation.hook';
import clsx from 'clsx';

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
  } = useBootstrapAnimation(isOpen, 300, template);

  if (!shouldRender || !templateToRender) return null;

  const wrapperModalClasses = clsx('modal', showElement && 'show', 'd-block', 'fade');
  const backdropClasses = clsx('modal-backdrop', 'fade', showElement && 'show');

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
