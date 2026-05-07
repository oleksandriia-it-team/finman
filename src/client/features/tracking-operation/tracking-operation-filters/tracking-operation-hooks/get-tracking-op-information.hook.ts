import { useTrackingOperationFilters } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-hooks/tracking-operation-filters.hook';
import { useQuery } from '@tanstack/react-query';
import { trackingOperationService } from '@frontend/features/tracking-operation/tracking-operation.service';
import constate from 'constate';
import type { GetBasicInformationResponse } from '@common/domains/tracking-operation/models/tracking-operation.repository.model';

function useGetBasicTrackingInformationLogic() {
  const { filters, filtersJSON } = useTrackingOperationFilters();

  return useQuery({
    queryKey: ['tracking operation filters', filtersJSON],
    queryFn: () => trackingOperationService.getBasicInformation(filters),
    placeholderData: {
      totalCount: 0,
      maxSum: 50000,
      totalOutcomes: 0,
      totalIncomes: 0,
    } satisfies GetBasicInformationResponse,
  });
}

export const [GetBasicTrackingInformationProvider, useGetBasicTrackingInformation] = constate(
  useGetBasicTrackingInformationLogic,
);
