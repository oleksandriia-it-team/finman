import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { UiSheetClose } from '@frontend/ui/ui-sheet/ui-sheet-close';
import * as React from 'react';

import './styles/ui-sheet-close-button-styles.scss';

export function UiSheetButtonClose() {
  return (
    <UiSheetClose className="sheet-close">
      <UiSvgIcon
        aria-hidden
        size="xxl"
        name="x"
        className="pointer-events-none"
      />
    </UiSheetClose>
  );
}
