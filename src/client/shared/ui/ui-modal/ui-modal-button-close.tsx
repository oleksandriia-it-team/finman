import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import * as React from 'react';

import { UiModalClose } from '@frontend/ui/ui-modal/ui-modal-close';

export function UiModalButtonClose() {
  return (
    <UiModalClose className="cursor-pointer">
      <UiSvgIcon
        aria-hidden
        size="xxl"
        name="x"
        className="pointer-events-none"
      />
    </UiModalClose>
  );
}
