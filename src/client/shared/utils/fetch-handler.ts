import { type ApiError } from '@frontend/shared/models/api-error.model';

/**
 * Handles the fetch API response, parsing JSON and managing empty bodies or errors.
 *
 * @template T - The expected structure of the response data.
 * @param {Response} response - The native Fetch API Response object.
 * @param {T} [defaultValue] - Optional value to return if the response body is empty.
 * If not provided and the body is empty, an error will be thrown.
 * @returns {Promise<T>} - Resolves to the parsed data or the provided default value.
 * @throws {ApiError} - Thrown for HTTP errors, domain-specific error statuses, or missing required bodies.
 */
export async function handleResponse<T>(response: Response, defaultValue?: T): Promise<T> {
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok || (data && data.status >= 400)) {
    const error: ApiError = {
      message: data?.message || response.statusText || 'Помилка запиту',
      status: data?.status || response.status,
      code: data?.code,
    };
    throw error;
  }
  if (data === null) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }

    const error: ApiError = {
      message: 'Expected JSON body for successful response',
      status: response.status,
    };
    throw error;
  }

  return data as T;
}
