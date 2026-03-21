import { ModalProps } from './props/modal.props';
import { useModalStore } from '../../hooks/modal/modal.hook';

export default function ModalTemplate<R>({ header, body, footer, onClose }: ModalProps<R>) {
  const hideModal = useModalStore((state) => state.hideModal);

  return (
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-title h5"> {header} </div>
          {onClose && (
            <button
              className="btn-close"
              onClick={() => {
                onClose(undefined);
                hideModal();
              }}
            />
          )}
        </div>
        <div className="modal-body">{body}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
