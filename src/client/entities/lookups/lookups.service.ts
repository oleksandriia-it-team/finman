import { type LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import { type LookupsFilters } from '@common/domains/lookups/models/lookups-filters';
import { LookupsEndpoints, LookupsTypeEndpoints } from '@common/domains/lookups/endpoints/lookups.endpoints';
import { LookupsTypeRequest } from '@common/domains/lookups/enums/lookups-type-request.enum';
import { type LookupsResponseResult } from '@common/domains/lookups/models/get-lookups-items-result';
import { type LookupsDto } from '@common/domains/lookups/models/lookups-dto';
import { type ApiResultOperation, type ApiResultOperationSuccess } from '@common/models/api-result-operation.model';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';

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
    let result: ApiResultOperation<LookupsResponseResult<LookupsDto[LT]>[LTR]>;

    if (typeRequest !== LookupsTypeRequest.GetById) {
      result = await fetchClient.post<ApiResultOperationSuccess<LookupsResponseResult<LookupsDto[LT]>[LTR]>>(
        `/api/lookups/${LookupsEndpoints[type]}/${LookupsTypeEndpoints[typeRequest]}`,
        payload,
        { signal: abortSignal ?? null },
      );
    } else {
      result = await fetchClient.get<ApiResultOperationSuccess<LookupsResponseResult<LookupsDto[LT]>[LTR]>>(
        `/api/lookups/${LookupsEndpoints[type]}/${LookupsTypeEndpoints[typeRequest]}/${
          (
            payload as {
              id: number;
            }
          ).id
        }`,
        {
          signal: abortSignal ?? null,
          skipAuth: false,
          throwErrorIfNotAuth: false,
        },
      );
    }

    return result.data;
  }
}

export const lookupsService = new LookupsService();
