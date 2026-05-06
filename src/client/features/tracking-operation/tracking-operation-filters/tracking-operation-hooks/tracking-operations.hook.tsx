'use client';

import constate from 'constate';
import type { TrackingOperationRecord } from '@common/records/tracking-operation.record';
import type { TrackingOperationFilter } from '@common/domains/tracking-operation/filter/tracking-operation.filter';
import type { DeepPartial } from '@common/models/deep-partial.model';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';
import { trackingOperationService } from '../../tracking-operation.service';

function useTrackingOperationsLogic() {
  const getOperations = (
    from: number,
    to: number,
    filters?: DeepPartial<TrackingOperationFilter>,
  ): Promise<TrackingOperationRecord[]> => {
    return trackingOperationService.getItems(from, to, {
      softDeleted: 0,
      ...filters,
    });
  };

  const getTotalCount = (filters?: DeepPartial<TrackingOperationFilter>): Promise<number> => {
    return trackingOperationService
      .getTotalCount({
        softDeleted: 0,
        ...filters,
      })
      .then((count) => count ?? 0);
  };

  const handleCreate = (dto: Omit<TrackingOperationRecord, DefaultColumnKeys>): Promise<number> => {
    return trackingOperationService.createItem(dto);
  };

  const handleDelete = (id: number): Promise<true> => {
    return trackingOperationService.deleteItem(id);
  };

  const handleUpdate = (id: number, dto: Omit<TrackingOperationRecord, DefaultColumnKeys>): Promise<true> => {
    return trackingOperationService.updateItem(id, dto);
  };

  const getById = (id: number): Promise<TrackingOperationRecord | null> => {
    return trackingOperationService.getItemById(id);
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
