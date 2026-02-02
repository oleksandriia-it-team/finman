import { ModalProps } from './props/modal.props';
import { RefObject } from 'react';

export default function ModalTemplate<R>({ header, body, footer, onClose, contentRef }: ModalProps<R>) {
  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
      role="dialog"
    >
      <div className="modal_dialog modal-dialog-centered">
        <div
          className="modal-content "
          ref={contentRef as RefObject<HTMLDivElement>}
        >
          <div className="modal-header">
            <div className="modal-title h5"> {header} </div>
            {onClose && (
              <button
                className="btn-close"
                onClick={() => onClose(undefined)}
              />
            )}
          </div>
          <div className="modal-body">{body}</div>
          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
