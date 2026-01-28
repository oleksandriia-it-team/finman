import { ModalProps } from './props/modal.props';

export default function modalTemplate({ header, body, footer, onClose }: ModalProps) {
  return (
    <div
      className="modal show d-block"
      tabIndex={-1}
    >
      <div className="modal_dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h5"> {header} </div>
          </div>
          <div className="modal-body">{body}</div>
          {footer && <div className="modal-footer">{footer}</div>}
        </div>
      </div>
    </div>
  );
}
