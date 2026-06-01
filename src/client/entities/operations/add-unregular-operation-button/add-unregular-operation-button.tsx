'use client';

import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';

interface AddOperationButtonProps {
  onClick: () => void;
  label?: string;
}

export function AddOperationButton({ onClick, label = 'Додати операцію' }: AddOperationButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-transparent text-primary cursor-pointer transition-colors aspect-square hover:border-primary hover:bg-primary/5 active:bg-primary/10 max-md:aspect-auto max-md:w-full max-md:flex-row max-md:px-3 max-md:py-2 max-md:min-h-14"
    >
      <UiSvgIcon
        name="plus"
        size="sm"
      />
      <UiTitle size="sm">{label}</UiTitle>
    </button>
  );
}
