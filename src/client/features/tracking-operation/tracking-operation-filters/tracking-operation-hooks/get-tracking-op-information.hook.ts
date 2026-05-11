import { useTrackingOperationFilters } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-hooks/tracking-operation-filters.hook';
import { useQuery } from '@tanstack/react-query';
import { trackingOperationService } from '@frontend/features/tracking-operation/tracking-operation.service';
import constate from 'constate';
import { getPromiseState } from '@frontend/shared/utils/get-promise-state.util';

function useGetBasicTrackingInformationLogic() {
  const { filters, filtersJSON } = useTrackingOperationFilters();

  const query = useQuery({
    queryKey: ['tracking operation filters', filtersJSON],
    queryFn: () => trackingOperationService.getBasicInformation(filters),
  });

  return {
    ...query,
    state: getPromiseState(query.status),
  };
}

export const [GetBasicTrackingInformationProvider, useGetBasicTrackingInformation] = constate(
  useGetBasicTrackingInformationLogic,
);
