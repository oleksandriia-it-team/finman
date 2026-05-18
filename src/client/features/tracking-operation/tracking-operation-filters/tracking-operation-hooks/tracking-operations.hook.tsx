'use client';

import constate from 'constate';
import type { TrackingOperationRecord } from '@common/records/tracking-operation.record';
import type { TrackingOperationFilter } from '@common/domains/tracking-operation/filter/tracking-operation.filter';
import type { DeepPartial } from '@common/models/deep-partial.model';
import type { DefaultColumnKeys } from '@common/models/default-table-columns.model';
import { trackingOperationService } from '../../tracking-operation.service';
import type { GetBasicInformationResponse } from '@common/domains/tracking-operation/models/tracking-operation.repository.model';

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

  const getBasicInformation = (
    filters?: DeepPartial<TrackingOperationFilter>,
  ): Promise<GetBasicInformationResponse> => {
    return trackingOperationService.getBasicInformation({
      softDeleted: 0,
      ...filters,
    });
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
    getBasicInformation,
    handleCreate,
    handleDelete,
    handleUpdate,
    getById,
  };
}

export const [TrackingOperationsProvider, useTrackingOperations] = constate(useTrackingOperationsLogic);
