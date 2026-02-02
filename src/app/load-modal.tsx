import { useModalStore } from '../client/shared/hooks/modal/modal.hook';
import { useEffect, useRef, useState } from 'react';
import { useEventContainment } from '../client/shared/hooks/event-containment/event-containment.hook';
import { useEventKey } from '../client/shared/hooks/event-key/event-key-hook';
import ModalTemplate from '../client/shared/сomponents/modal/modal-template';

export default function LoadModal() {
  const { isOpen, params, closeModal } = useModalStore();

  const contentRef = useRef<HTMLElement>(null);
  const [listenElements, setListenElements] = useState<HTMLElement[]>([]);

  useEffect(() => {
    if (isOpen && contentRef.current) {
      setListenElements([contentRef.current]);
    }
  }, [isOpen]);

  useEventContainment(listenElements, 'click', (isInside) => {
    if (isOpen && !isInside && params?.closeOnOutsideClick) {
      closeModal(undefined);
    }
  });

  useEventKey(typeof window !== 'undefined' ? document.body : null, ['Escape'], () => {
    if (isOpen && params?.closeOnEsc) {
      closeModal(undefined);
    }
  });

  if (!isOpen || !params) return null;

  return (
    <ModalTemplate
      header={params.header}
      body={params.body}
      footer={params.footer}
      onClose={(result) => closeModal(result)}
      contentRef={contentRef}
    />
  );
}
