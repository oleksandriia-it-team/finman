import { LookupsTypeEnum } from '../../../common/domains/lookups/enums/lookups-type.enum';
import { LookupsFilters } from '../../../common/domains/lookups/models/lookups-filters';
import { LookupsEndpoints, LookupsTypeEndpoints } from '../../../common/constants/lookups-endpoints.constant';
import { LookupsTypeRequest } from '../../../common/domains/lookups/enums/lookups-type-request.enum';
import { LookupsResponseResult } from '../../../common/domains/lookups/models/get-lookups-items-result';
import { LookupsDto } from '../../../common/domains/lookups/models/lookups-dto';
import { ApiResultOperation, ApiResultOperationSuccess } from '../../../common/models/api-result-operation.model';

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
  ): Promise<LookupsDto[T][]> {
    return this.fetchLookups(type, LookupsTypeRequest.GetItems, abortSignal, { from, to, filters });
  }

  getItem<T extends LookupsTypeEnum>(type: T, id: number, abortSignal?: AbortSignal): Promise<LookupsDto[T] | null> {
    return this.fetchLookups(type, LookupsTypeRequest.GetById, abortSignal, { id });
  }

  getTotalCount<T extends LookupsTypeEnum>(
    type: T,
    filters: Partial<LookupsFilters[T]>,
    abortSignal?: AbortSignal,
  ): Promise<number> {
    return this.fetchLookups(type, LookupsTypeRequest.GetTotalItems, abortSignal, { filters });
  }

  private async fetchLookups<LT extends LookupsTypeEnum, LTR extends LookupsTypeRequest>(
    type: LT,
    typeRequest: LTR,
    abortSignal: AbortSignal | undefined,
    payload: unknown,
  ): Promise<LookupsResponseResult<LookupsDto[LT]>[LTR]> {
    const result = await fetch(`/api/lookups/${LookupsEndpoints[type]}/${LookupsTypeEndpoints[typeRequest]}`, {
      method: 'post',
      body: JSON.stringify(payload),
      signal: abortSignal ?? null,
    });
    const body: ApiResultOperation<LookupsResponseResult<LookupsDto[LT]>[LTR]> = await result.json();

    if (body.status === 400 || body.status === 500) {
      throw new Error(body.message);
    }

    return (body as ApiResultOperationSuccess<LookupsResponseResult<LookupsDto[LT]>[LTR]>).data;
  }
}

export const lookupsService = new LookupsService();
