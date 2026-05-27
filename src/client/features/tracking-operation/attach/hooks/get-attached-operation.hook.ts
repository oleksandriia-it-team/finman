import { useFormContext } from 'react-hook-form';
import { useGetOperationsForAttach } from '@frontend/features/tracking-operation/attach/hooks/get-operations-for-attach.hook';
import { isEmpty } from '@common/utils/is-empty.util';
import constate from 'constate';

function useGetAttachedOperationLogic() {
  const { watch } = useFormContext();
  const { operations } = useGetOperationsForAttach();

  const attachedPlannedRegEntryId = watch('attachedPlannedRegEntryId') as number | undefined | null;
  const attachedPlannedMonthEntryId = watch('attachedPlannedMonthEntryId') as number | undefined | null;

  if (!isEmpty(attachedPlannedRegEntryId)) {
    return operations.regular.find((entry) => entry.id === attachedPlannedRegEntryId);
  } else if (!isEmpty(attachedPlannedMonthEntryId)) {
    return operations.month.find((entry) => entry.id === attachedPlannedMonthEntryId);
  }

  return undefined;
}

export const [GetAttachedOperationProvider, useGetAttachedOperation] = constate(useGetAttachedOperationLogic);
