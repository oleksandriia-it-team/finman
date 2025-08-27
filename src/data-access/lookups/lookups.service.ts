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


export class LookupsService {
  private async fetchLookups<LT extends LookupsTypeEnum, LTR extends LookupsTypeRequest>(type: LT, typeRequest: LTR, payload: unknown): Promise<DatabaseResultOperationSuccess<LookupsResponseResult<LT>[LTR]>> {
    const result = await fetch(`/api/${ LookupsEndpoints[type] }/${ LookupsTypeEndpoints[typeRequest] }`, { body: JSON.stringify(payload) });
    const body: DatabaseResultOperation<LookupsResponseResult<LT>[LTR]> = await result.json();

    if(body.status === 400 || body.status === 500) {
      throw body;
    }

    return body as DatabaseResultOperationSuccess<LookupsResponseResult<LT>[LTR]>;
  }

  getItems<T extends LookupsTypeEnum>(type: T, from: number, to: number, filters: Partial<LookupsFilters[T]>): Promise<DatabaseResultOperationSuccess<T[]>> {
    return this.fetchLookups(type, LookupsTypeRequest.GetItems, { from, to, filters });
  }

  getItem<T extends LookupsTypeEnum>(type: T, id: number): Promise<DatabaseResultOperationSuccess<T | null>> {
    return this.fetchLookups(type, LookupsTypeRequest.GetById, { id });
  }

  getTotalCount<T extends LookupsTypeEnum>(type: T, filters: Partial<LookupsFilters[T]>): Promise<DatabaseResultOperationSuccess<number>> {
    return this.fetchLookups(type, LookupsTypeRequest.GetTotalItems, { filters });
  }
}
