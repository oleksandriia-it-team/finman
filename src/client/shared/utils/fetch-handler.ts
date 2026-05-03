import { checkIsAppErrorObj } from '@common/utils/check-is-api-error.util';
import { AppError } from '@common/classes/app-error.class';

/**
 * Handles the fetch API response, parsing JSON and managing empty bodies or errors.
 *
 * @template T - The expected structure of the response data.
 * @param {Response} response - The native Fetch API Response object.
 * @param {T} [defaultValue] - Optional value to return if the response body is empty.
 * If not provided and the body is empty, an error will be thrown.
 * @returns {Promise<T>} - Resolves to the parsed data or the provided default value.
 * @throws {AppError} - Thrown for HTTP errors, domain-specific error statuses, or missing required bodies.
 */
export async function handleResponse<T>(response: Response, defaultValue?: T): Promise<T> {
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : null;

  if (!response.ok || (data && data.status >= 400)) {
    if (checkIsAppErrorObj(data)) throw new AppError(data.message, data.status);
    if (checkIsAppErrorObj(data)) {
      throw new AppError(data.message, data.status);
    }

    throw new AppError(
      'Неочікувана помилка з обробкою запиту. Спробуйте пізніше',
      response.status >= 400 ? response.status : 500,
    );
  }
  if (data === null) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }

    throw new AppError('Неочікувана помилка з обробкою запиту. Спробуйте пізніше', 500);
  }

  return data as T;
}
