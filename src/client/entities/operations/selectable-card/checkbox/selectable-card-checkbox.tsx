'use client';

import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

interface SelectableCardCheckboxProps {
  selected: boolean;
  className?: string;
}

export function SelectableCardCheckbox({ selected, className }: SelectableCardCheckboxProps) {
  return (
    <div className={className}>
      {selected && (
        <UiSvgIcon
          name="check"
          size="xs"
          className="text-primary-foreground!"
        />
      )}
    </div>
  );
}
