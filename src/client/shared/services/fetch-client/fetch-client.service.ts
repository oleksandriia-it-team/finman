import { type RequestOptions } from '@frontend/shared/services/fetch-client/models/request-options.model';
import { handleResponse } from '@frontend/shared/utils/fetch-handler';
import { isEmpty } from '@common/utils/is-empty.util';
import { PublicEnvConfigConstant } from '@common/config/public-env-config.constant';
import type { AuthTokenModel } from '@frontend/shared/models/auth-token.model';
import { authTokenService } from '@frontend/shared/services/user-information/auth-token.service';
import type { ApiResultOperationError } from '@common/models/api-result-operation.model';

class FetchClientService {
  private readonly baseUrl: string;

  constructor(private authTokenService: AuthTokenModel) {
    this.baseUrl = PublicEnvConfigConstant.NEXT_PUBLIC_API_URL;
  }

  private async request<T, D = unknown>(
    endpoint: string,
    method: string,
    options: RequestOptions<D, T> = {},
  ): Promise<T> {
    const { params, body, signal, defaultValue, headers: customHeaders, skipAuth = false, ...restOptions } = options;
    const headers = new Headers(customHeaders);

    const hasAuthorizationHeader = Boolean(headers.get('Authorization')?.trim());
    const accessToken = this.authTokenService.getAccessToken();

    if (!skipAuth && !accessToken && !hasAuthorizationHeader) {
      throw { status: 401, message: 'Ви не авторизовані' } satisfies ApiResultOperationError;
    }

    const url = new URL(`${this.baseUrl}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (!isEmpty(value)) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const isFormData = body instanceof FormData;
    let requestBody: BodyInit | null = null;

    if (body !== undefined && body !== null) {
      if (!headers.has('Content-Type') && !isFormData) {
        headers.set('Content-Type', 'application/json');
      }
      requestBody = isFormData ? (body as FormData) : JSON.stringify(body);
    }

    if (!skipAuth && accessToken && !hasAuthorizationHeader) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    const response = await fetch(url.toString(), {
      ...restOptions,
      method,
      headers,
      body: requestBody,
      signal: signal ?? null,
    });
    return handleResponse<T>(response, defaultValue);
  }

  public get<T>(endpoint: string, options?: RequestOptions<never, T>): Promise<T> {
    return this.request<T, never>(endpoint, 'GET', options);
  }

  public post<T, D = unknown>(endpoint: string, body?: D, options?: RequestOptions<D, T>): Promise<T> {
    return this.request<T, D>(endpoint, 'POST', { ...options, body });
  }

  public put<T, D = unknown>(endpoint: string, body?: D, options?: RequestOptions<D, T>): Promise<T> {
    return this.request<T, D>(endpoint, 'PUT', { ...options, body });
  }

  public patch<T, D = unknown>(endpoint: string, body?: D, options?: RequestOptions<D, T>): Promise<T> {
    return this.request<T, D>(endpoint, 'PATCH', { ...options, body });
  }

  public delete<T>(endpoint: string, options?: RequestOptions<never, T>): Promise<T> {
    return this.request<T, never>(endpoint, 'DELETE', options);
  }
}

export const fetchClient = new FetchClientService(authTokenService);
