import { ToastProps } from './props/toast.props';
import { useToastHook } from '../../hooks/toast/toast.hook';
import { useEffect, useState } from 'react';
import { useBootstrapAnimation } from '../../hooks/bootstrap-animation/bootstrap-animation.hook';
import clsx from 'clsx';
import { ToastVariant } from '../../hooks/toast/models/toast-config.model';

const variants: Record<ToastVariant, string> = {
  success: 'toast-success',
  error: 'toast-error',
  info: '',
  warning: 'toast-warning',
};

export default function ToastTemplate({ config }: ToastProps) {
  const removeToast = useToastHook((state) => state.removeToast);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!config.duration) return;
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, config.duration);
    return () => clearTimeout(timer);
  }, [config.duration]);

  const { showElement, shouldRender } = useBootstrapAnimation(isVisible, 300, true);

  useEffect(() => {
    if (!shouldRender && !isVisible) {
      removeToast(config.id);
    }
  }, [shouldRender, isVisible, removeToast, config.id]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const classes = clsx(
    'toast',
    'fade',
    shouldRender && 'show',
    !showElement && 'showing',
    !showElement && 'hiding',
    !shouldRender && 'hide',
    variants[config.type],
  );

  if (!shouldRender) return null;

  return (
    <div
      className={classes}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-header">
        <strong className="me-auto">{config.title}</strong>
        {config.canClose && (
          <button
            type="button"
            onClick={handleClose}
            className="btn-close"
            aria-label="Close"
          />
        )}
      </div>
      <div className="toast-body">{config.message}</div>
    </div>
  );
}
