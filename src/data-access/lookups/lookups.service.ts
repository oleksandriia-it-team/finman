import { LookupsTypeEnum } from '../../app/api/lookups/shared/enums/lookups-type.enum';
import { LookupsFilters } from '../../app/api/lookups/shared/models/lookups-filters';
import {
  LookupsEndpoints,
  LookupsTypeEndpoints
} from '../../app/api/lookups/shared/constants/lookups-endpoints.constant';
import { LookupsTypeRequest } from '../../app/api/lookups/shared/enums/lookups-type-request.enum';
import {
  DatabaseResultOperation,
  DatabaseResultOperationSuccess
} from '../../shared/models/database-result-operation.model';
import { LookupsResponseResult } from '../../app/api/lookups/shared/models/get-lookups-items-result';
import { InjectToken } from '../../shared/classes/inject-token.class';

/**
 * Service for handling lookup operations
 * Provides methods for retrieving lookup items and related data
 */
export class LookupsService {
  /**
   * Retrieves a paginated list of lookup items
   *
   * @template T - Type extending LookupsTypeEnum
   * @param {T} type - The type of lookups to retrieve
   * @param {number} from - Starting index for pagination
   * @param {number} to - Ending index for pagination
   * @param {Partial<LookupsFilters[T]>} [filters] - Optional filters to apply to the query
   * @returns {Promise<DatabaseResultOperationSuccess<T[]>>} Promise with the result containing the lookup items
   */
  getItems<T extends LookupsTypeEnum>(type: T, from: number, to: number, signal?: AbortSignal, filters?: Partial<LookupsFilters[T]>): Promise<DatabaseResultOperationSuccess<T[]>> {
    return this.fetchLookups(type, LookupsTypeRequest.GetItems, { from, to, filters }, signal);
  }

  /**
   * Retrieves a single lookup item by its ID
   *
   * @template T - Type extending LookupsTypeEnum
   * @param {T} type - The type of lookup to retrieve
   * @param {number} id - ID of the lookup item to retrieve
   * @returns {Promise<DatabaseResultOperationSuccess<T | null>>} Promise with the result containing the lookup item or null if not found
   */
  getItem<T extends LookupsTypeEnum>(type: T, id: number, signal?: AbortSignal): Promise<DatabaseResultOperationSuccess<T | null>> {
    return this.fetchLookups(type, LookupsTypeRequest.GetById, { id }, signal);
  }

  getTotalCount<T extends LookupsTypeEnum>(type: T, signal?: AbortSignal, filters?: Partial<LookupsFilters[T]>): Promise<DatabaseResultOperationSuccess<number>> {
    return this.fetchLookups(type, LookupsTypeRequest.GetTotalItems, { filters }, signal);
  }

  private async fetchLookups<LT extends LookupsTypeEnum, LTR extends LookupsTypeRequest>(type: LT, typeRequest: LTR, payload: unknown, signal?: AbortSignal): Promise<DatabaseResultOperationSuccess<LookupsResponseResult<LT>[LTR]>> {
    const result = await fetch(`/api/lookups/${ LookupsEndpoints[type] }/${ LookupsTypeEndpoints[typeRequest] }`, {
      signal: signal as never,
      method: 'post',
      body: JSON.stringify(payload)
    });
    const body: DatabaseResultOperation<LookupsResponseResult<LT>[LTR]> = await result.json();

    if (body.status === 400 || body.status === 500) {
      throw body;
    }

    return body as DatabaseResultOperationSuccess<LookupsResponseResult<LT>[LTR]>;
  }
}


export const lookupsProvider = new InjectToken<LookupsService>('LookupsService');
