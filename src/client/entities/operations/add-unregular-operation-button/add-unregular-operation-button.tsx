'use client';

import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import './add-unregular-operation-button.scss';

interface AddOperationButtonProps {
  onClick: () => void;
  label?: string;
}

export function AddOperationButton({ onClick, label = 'Додати операцію' }: AddOperationButtonProps) {
  return (
    <button
      type="button"
      className="add-operation-button"
      onClick={onClick}
    >
      <UiSvgIcon
        name="plus"
        size="sm"
      />
      <span className="add-operation-button-label">{label}</span>
    </button>
  );
}
