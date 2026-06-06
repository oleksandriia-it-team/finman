import { type RequestOptions } from '@frontend/shared/services/fetch-client/models/request-options.model';
import { handleResponse } from '@frontend/shared/utils/fetch-handler';
import { isEmpty } from '@common/utils/is-empty.util';
import type { AuthTokenModel } from '@frontend/shared/models/auth-token.model';
import { authTokenService } from '@frontend/shared/services/user-information/auth-token.service';
import { AppError } from '@common/classes/app-error.class';
import { ErrorTexts } from '@common/constants/error-texts.constant';

class FetchClientService {
  constructor(private readonly authTokenService: AuthTokenModel) {}

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

  private async request<T, D = unknown>(
    endpoint: string,
    method: string,
    options: RequestOptions<D, T> = {},
  ): Promise<T> {
    const {
      params,
      body,
      signal,
      defaultValue,
      headers: customHeaders,
      skipAuth = false,
      throwErrorIfNotAuth = true,
      ...restOptions
    } = options;
    const headers = new Headers(customHeaders);

    const hasAuthorizationHeader = Boolean(headers.get('Authorization')?.trim());
    const accessToken = this.authTokenService.getAccessToken();

    if (!skipAuth && !accessToken && !hasAuthorizationHeader && throwErrorIfNotAuth) {
      throw new AppError(ErrorTexts.Unauthorized, 401);
    }

    const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (!isEmpty(value)) {
          searchParams.append(key, String(value));
        }
      });
    }
    const queryString = searchParams.toString();
    const url = queryString ? `${normalizedEndpoint}?${queryString}` : normalizedEndpoint;

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

    const response = await fetch(url, {
      ...restOptions,
      method,
      headers,
      body: requestBody,
      signal: signal ?? null,
    });
    return handleResponse<T>(response, defaultValue);
  }
}

export const fetchClient = new FetchClientService(authTokenService);
