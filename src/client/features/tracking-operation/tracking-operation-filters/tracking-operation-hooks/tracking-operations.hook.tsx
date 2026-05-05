'use client';

import constate from 'constate';
import type { TrackingOperationRecord } from '@common/records/tracking-operation.record';
import type { TrackingOperationDto } from '@common/domains/tracking-operation/schema/tracking-operation.schema';
import type { TrackingOperationFilter } from '@common/domains/tracking-operation/filter/tracking-operation.filter';
import type { DeepPartial } from '@common/models/deep-partial.model';
import { trackingOperationsApiClient } from '@frontend/entities/tracking-operations/tracking-operations.api.client';

function useTrackingOperationsLogic() {
  const getOperations = (
    from: number,
    to: number,
    filters?: DeepPartial<TrackingOperationFilter>,
  ): Promise<TrackingOperationRecord[]> => {
    return trackingOperationsApiClient.getItems(from, to, {
      softDeleted: 0,
      ...filters,
    });
  };

  const getTotalCount = (filters?: DeepPartial<TrackingOperationFilter>): Promise<number> => {
    return trackingOperationsApiClient
      .getTotalCount({
        softDeleted: 0,
        ...filters,
      })
      .then((count) => count ?? 0);
  };

  const handleCreate = (dto: TrackingOperationDto): Promise<number> => {
    return trackingOperationsApiClient.createItem(dto);
  };

  const handleDelete = (id: number): Promise<true> => {
    return trackingOperationsApiClient.deleteItem(id);
  };

  const handleUpdate = (id: number, dto: TrackingOperationDto): Promise<true> => {
    return trackingOperationsApiClient.updateItem(id, dto);
  };

  const getById = (id: number): Promise<TrackingOperationRecord | null> => {
    return trackingOperationsApiClient.getItemById(id);
  };

  return {
    getOperations,
    getTotalCount,
    handleCreate,
    handleDelete,
    handleUpdate,
    getById,
  };
}

export const [TrackingOperationsProvider, useTrackingOperations] = constate(useTrackingOperationsLogic);
