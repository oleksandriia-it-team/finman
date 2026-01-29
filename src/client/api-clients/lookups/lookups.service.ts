import { LookupsTypeEnum } from '../../../server/shared/enums/lookups-type.enum';
import { LookupsFilters } from '../../../common/models/lookups-filters';
import { LookupsEndpoints, LookupsTypeEndpoints } from '../../../common/constants/lookups-endpoints.constant';
import { LookupsTypeRequest } from '../../../server/shared/enums/lookups-type-request.enum';
import {
  DatabaseResultOperation,
  DatabaseResultOperationSuccess,
} from '../../../common/models/database-result-operation.model';
import { LookupsResponseResult } from '../../../common/models/get-lookups-items-result';
import { LookupsDto } from '../../../common/models/lookups-dto';

/**
 * Service for handling lookup operations
 * Provides methods for retrieving lookup items and related data
 */
export class LookupsService {
  getItems<T extends LookupsTypeEnum>(
    type: T,
    from: number,
    to: number,
    filters: Partial<LookupsFilters[T]>,
    abortSignal?: AbortSignal,
  ): Promise<DatabaseResultOperationSuccess<LookupsDto[T][]>> {
    return this.fetchLookups(type, LookupsTypeRequest.GetItems, abortSignal, { from, to, filters });
  }

  getItem<T extends LookupsTypeEnum>(
    type: T,
    id: number,
    abortSignal?: AbortSignal,
  ): Promise<DatabaseResultOperationSuccess<LookupsDto[T] | null>> {
    return this.fetchLookups(type, LookupsTypeRequest.GetById, abortSignal, { id });
  }

  getTotalCount<T extends LookupsTypeEnum>(
    type: T,
    filters: Partial<LookupsFilters[T]>,
    abortSignal?: AbortSignal,
  ): Promise<DatabaseResultOperationSuccess<number>> {
    return this.fetchLookups(type, LookupsTypeRequest.GetTotalItems, abortSignal, { filters });
  }

  private async fetchLookups<LT extends LookupsTypeEnum, LTR extends LookupsTypeRequest>(
    type: LT,
    typeRequest: LTR,
    abortSignal: AbortSignal | undefined,
    payload: unknown,
  ): Promise<DatabaseResultOperationSuccess<LookupsResponseResult<LookupsDto[LT]>[LTR]>> {
    const result = await fetch(`/api/lookups/${LookupsEndpoints[type]}/${LookupsTypeEndpoints[typeRequest]}`, {
      method: 'post',
      body: JSON.stringify(payload),
      signal: abortSignal ?? null,
    });
    const body: DatabaseResultOperation<LookupsResponseResult<LookupsDto[LT]>[LTR]> = await result.json();

    if (body.status === 400 || body.status === 500) {
      throw body;
    }

    return body as DatabaseResultOperationSuccess<LookupsResponseResult<LookupsDto[LT]>[LTR]>;
  }
}

export const lookupsService = new LookupsService();
