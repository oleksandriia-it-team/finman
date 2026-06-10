import { type LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import { type LookupsFilters } from '@common/domains/lookups/models/lookups-filters';
import { LookupsEndpoints, LookupsTypeEndpoints } from '@common/domains/lookups/endpoints/lookups.endpoints';
import { LookupsTypeRequest } from '@common/domains/lookups/enums/lookups-type-request.enum';
import { type LookupsResponseResult } from '@common/domains/lookups/models/get-lookups-items-result';
import { type LookupsDto } from '@common/domains/lookups/models/lookups-dto';
import { type ApiResultOperation, type ApiResultOperationSuccess } from '@common/models/api-result-operation.model';
import { fetchClient } from '@frontend/shared/services/fetch-client/fetch-client.service';
import { authTokenService } from '@frontend/shared/services/user-information/auth-token.service';
import { currencyLocalRepository } from '@frontend/entities/lookups/currency.local.repository';
import { countriesAndLocalesLocalRepository } from '@frontend/entities/lookups/countries-and-locales.local.repository';
import { databaseLocalService } from '@frontend/database/database.local.service';
import type { CrudLocalRepository } from '@frontend/database/crud/crud.local.repository';
import type { DefaultTableColumns } from '@common/models/default-table-columns.model';

/**
 * Service for handling lookup operations
 * Provides methods for retrieving lookup items and related data.
 *
 * In offline mode (no access token) reads from Dexie local repositories,
 * seeded from `/public/json/*.json` on first connect.
 */
export class LookupsService {
  private get isOfflineMode(): boolean {
    // Use local Dexie only when user is in Offline work mode (no token) AND
    // Dexie is connected. On the signup page neither is true yet, so we
    // still go via API.
    return !authTokenService.getAccessToken() && Boolean(databaseLocalService.db?.isOpen());
  }

  private getLocalRepository<T extends LookupsTypeEnum>(
    type: T,
  ): CrudLocalRepository<DefaultTableColumns & LookupsDto[T], LookupsFilters[T]> {
    const map = {
      0: countriesAndLocalesLocalRepository,
      1: currencyLocalRepository,
    } as const;
    return map[type as 0 | 1] as never;
  }

  async getItems<T extends LookupsTypeEnum>(
    type: T,
    from: number,
    to: number,
    filters: Partial<LookupsFilters[T]>,
    abortSignal?: AbortSignal,
  ): Promise<LookupsDto[T][]> {
    if (this.isOfflineMode) {
      return (await this.getLocalRepository(type).getItems(from, to, filters as never)) as LookupsDto[T][];
    }
    return this.fetchLookups(type, LookupsTypeRequest.GetItems, abortSignal, { from, to, filters });
  }

  async getItem<T extends LookupsTypeEnum>(
    type: T,
    id: number,
    abortSignal?: AbortSignal,
  ): Promise<LookupsDto[T] | null> {
    if (this.isOfflineMode) {
      return (await this.getLocalRepository(type).getItemById(id)) as LookupsDto[T] | null;
    }
    return this.fetchLookups(type, LookupsTypeRequest.GetById, abortSignal, { id });
  }

  async getTotalCount<T extends LookupsTypeEnum>(
    type: T,
    filters: Partial<LookupsFilters[T]>,
    abortSignal?: AbortSignal,
  ): Promise<number> {
    if (this.isOfflineMode) {
      return this.getLocalRepository(type).getTotalCount(filters as never);
    }
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
        { signal: abortSignal ?? null, throwErrorIfNotAuth: false },
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
