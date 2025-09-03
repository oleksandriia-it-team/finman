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
import { LookupsDto } from '../../app/api/lookups/shared/models/lookups-dto';

export class LookupsService {
  getItems<T extends LookupsTypeEnum>(type: T, from: number, to: number, filters: Partial<LookupsFilters[T]>): Promise<DatabaseResultOperationSuccess<LookupsDto[T][]>> {
    return this.fetchLookups(type, LookupsTypeRequest.GetItems, { from, to, filters });
  }

  getItem<T extends LookupsTypeEnum>(type: T, id: number): Promise<DatabaseResultOperationSuccess<LookupsDto[T] | null>> {
    return this.fetchLookups(type, LookupsTypeRequest.GetById, { id });
  }

  getTotalCount<T extends LookupsTypeEnum>(type: T, filters: Partial<LookupsFilters[T]>): Promise<DatabaseResultOperationSuccess<number>> {
    return this.fetchLookups(type, LookupsTypeRequest.GetTotalItems, { filters });
  }

  private async fetchLookups<LT extends LookupsTypeEnum, LTR extends LookupsTypeRequest>(type: LT, typeRequest: LTR, payload: unknown): Promise<DatabaseResultOperationSuccess<LookupsResponseResult<LookupsDto[LT]>[LTR]>> {
    const result = await fetch(`/api/lookups/${ LookupsEndpoints[type] }/${ LookupsTypeEndpoints[typeRequest] }`, {
      method: 'post',
      body: JSON.stringify(payload)
    });
    const body: DatabaseResultOperation<LookupsResponseResult<LookupsDto[LT]>[LTR]> = await result.json();

    if (body.status === 400 || body.status === 500) {
      throw body;
    }

    return body as DatabaseResultOperationSuccess<LookupsResponseResult<LookupsDto[LT]>[LTR]>;
  }
}

export const lookupsProvider = new InjectToken<LookupsService>('LookupsService');
