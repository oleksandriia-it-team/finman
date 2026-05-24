import { authTokenService } from '@frontend/shared/services/user-information/auth-token.service';
import { trackingOperationsApiClient } from '@frontend/entities/tracking-operations/tracking-operations.api.client';
import { trackingOperationLocalRepository } from '@frontend/entities/tracking-operations/tracking-operation.local.repository';
import type { GetShortStatisticResponse } from '@common/domains/tracking-operation/models/tracking-operation.repository.model';

export function getShortStatistic(): Promise<GetShortStatisticResponse> {
  const isOffline = !authTokenService.getAccessToken();

  return isOffline
    ? trackingOperationLocalRepository.getShortStatistic()
    : trackingOperationsApiClient.getShortStatistic();
}
