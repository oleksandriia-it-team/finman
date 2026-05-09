import type { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import type { ChildrenComponentProps } from '@frontend/shared/models/component-with-chilren.model';

export interface FinListInsideWrapperProps extends ChildrenComponentProps {
  state: PromiseState;
}
