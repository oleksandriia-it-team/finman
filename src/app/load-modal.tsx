import { useModalStore } from '../client/shared/hooks/modal/modal.hook';
import { useShallow } from 'zustand/react/shallow';
import { useEffect, useState } from 'react';
import { useEventKey } from '../client/shared/hooks/event-key/event-key-hook';

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

  if (!isOpen || !template) return null;

  return (
    <div
      className="modal show d-block"
      ref={setModalRef}
      onClick={(event) => {
        if (event.target === modalRef) {
          onClose?.();
          hideModal();
        }
      }}
      tabIndex={-1}
      role="dialog"
    >
      {template}
    </div>
  );
}
