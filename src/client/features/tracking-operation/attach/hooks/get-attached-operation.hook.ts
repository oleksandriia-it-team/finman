import { useFormContext } from 'react-hook-form';
import { useAttachState } from '@frontend/features/tracking-operation/attach/hooks/attach-state.context';
import { isEmpty } from '@common/utils/is-empty.util';

export function useGetAttachedOperation() {
  const { watch } = useFormContext();
  const { operations } = useAttachState();

  const attachedPlannedRegEntryId = watch('attachedPlannedRegEntryId') as number | undefined | null;
  const attachedPlannedMonthEntryId = watch('attachedPlannedMonthEntryId') as number | undefined | null;

  if (!isEmpty(attachedPlannedRegEntryId)) {
    return operations.regular.find((entry) => entry.id === attachedPlannedRegEntryId);
  } else if (!isEmpty(attachedPlannedMonthEntryId)) {
    return operations.month.find((entry) => entry.id === attachedPlannedMonthEntryId);
  }

  return undefined;
}
